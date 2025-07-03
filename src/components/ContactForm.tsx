import React, { useState } from 'react';
import { supabase, isSupabaseConfigured, type LoanApplication } from '../lib/supabase';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  initialAmount?: number;
  initialTerm?: number;
}

export default function ContactForm({ initialAmount = 50000, initialTerm = 12 }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    loanAmount: initialAmount,
    loanTermMonths: initialTerm,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'loanAmount' || name === 'loanTermMonths' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured || !supabase) {
        // Simulate form submission for demo purposes
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitStatus('success');
        console.log('Form data (demo mode):', formData);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          loanAmount: initialAmount,
          loanTermMonths: initialTerm,
          message: ''
        });
        return;
      }

      const applicationData: Omit<LoanApplication, 'id' | 'created_at' | 'updated_at'> = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        loan_amount: formData.loanAmount,
        loan_term_months: formData.loanTermMonths,
        message: formData.message,
        status: 'pending'
      };

      const { error } = await supabase
        .from('loan_applications')
        .insert([applicationData]);

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        loanAmount: initialAmount,
        loanTermMonths: initialTerm,
        message: ''
      });

    } catch (error) {
      console.error('Error submitting loan application:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error al enviar la solicitud');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">¡Solicitud Enviada!</h3>
          <p className="text-gray-600">
            Gracias por confiar en Comarfin. Hemos recibido tu solicitud de préstamo y nos pondremos en contacto contigo dentro de las próximas 24 horas.
          </p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Solicitar Préstamo</h3>
      
      {!isSupabaseConfigured && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            <strong>Modo Demo:</strong> Para conectar con la base de datos, configura las variables de entorno de Supabase.
          </p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
          <AlertCircle className="text-red-600" size={20} />
          <div>
            <p className="text-red-800 font-medium">Error al enviar la solicitud</p>
            <p className="text-red-600 text-sm">{errorMessage}</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Apellido *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
              placeholder="Tu apellido"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
            placeholder="Tu número de teléfono"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
            placeholder="tu@email.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monto solicitado *
            </label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleInputChange}
              required
              min="10000"
              max="2000000"
              step="1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
              placeholder="$50.000"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Plazo (meses) *
            </label>
            <select 
              name="loanTermMonths"
              value={formData.loanTermMonths}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
            >
              <option value={6}>6 meses</option>
              <option value={12}>12 meses</option>
              <option value={18}>18 meses</option>
              <option value={24}>24 meses</option>
              <option value={36}>36 meses</option>
              <option value={48}>48 meses</option>
              <option value={60}>60 meses</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Mensaje (opcional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
            placeholder="Contanos para qué necesitás el préstamo..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors transform hover:scale-105 duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Enviando...</span>
            </>
          ) : (
            <span>Enviar Solicitud</span>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Al enviar este formulario aceptás nuestros términos y condiciones. 
          Nos comprometemos a proteger tu información personal.
        </p>
      </form>
    </div>
  );
}