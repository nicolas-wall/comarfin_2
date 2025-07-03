import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  Users, 
  Shield, 
  Calculator,
  Menu,
  X,
  ArrowRight,
  Star,
  CreditCard,
  FileText,
  Zap
} from 'lucide-react';
import ContactForm from './components/ContactForm';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(12);

  const calculateMonthlyPayment = () => {
    const rate = 0.035; // 3.5% monthly rate (example)
    const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, loanTerm)) / 
                          (Math.pow(1 + rate, loanTerm) - 1);
    return monthlyPayment.toLocaleString('es-AR', { 
      style: 'currency', 
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src="/image.png" alt="Comarfin" className="h-10 w-auto" />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('inicio')} className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                Inicio
              </button>
              <button onClick={() => scrollToSection('servicios')} className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                Servicios
              </button>
              <button onClick={() => scrollToSection('calculadora')} className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                Calculadora
              </button>
              <button onClick={() => scrollToSection('nosotros')} className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                Nosotros
              </button>
              <button onClick={() => scrollToSection('contacto')} className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                Contacto
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-pink-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <button onClick={() => scrollToSection('inicio')} className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium py-2">
                  Inicio
                </button>
                <button onClick={() => scrollToSection('servicios')} className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium py-2">
                  Servicios
                </button>
                <button onClick={() => scrollToSection('calculadora')} className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium py-2">
                  Calculadora
                </button>
                <button onClick={() => scrollToSection('nosotros')} className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium py-2">
                  Nosotros
                </button>
                <button onClick={() => scrollToSection('contacto')} className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium py-2">
                  Contacto
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-16 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Tu préstamo personal
                  <span className="text-pink-600 block">al alcance</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  En Comarfin te ayudamos a conseguir el préstamo que necesitás de forma rápida, 
                  segura y con las mejores condiciones en toda la Provincia de Buenos Aires.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className="bg-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Solicitar Préstamo</span>
                  <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => scrollToSection('calculadora')}
                  className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-pink-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Calculator size={20} />
                  <span>Calcular Cuota</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">+5000</div>
                  <div className="text-sm text-gray-600">Préstamos otorgados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">24hs</div>
                  <div className="text-sm text-gray-600">Respuesta rápida</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">15+</div>
                  <div className="text-sm text-gray-600">Años de experiencia</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="text-pink-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Aprobación Rápida</h3>
                      <p className="text-gray-600 text-sm">Respuesta en 24 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">100% Seguro</h3>
                      <p className="text-gray-600 text-sm">Datos protegidos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <DollarSign className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Mejores Tasas</h3>
                      <p className="text-gray-600 text-sm">Condiciones competitivas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos soluciones financieras adaptadas a tus necesidades específicas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <CreditCard className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Préstamos Personales</h3>
              <p className="text-gray-600 mb-6">
                Hasta $2.000.000 para cualquier necesidad. Plazos flexibles de 6 a 60 meses.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-gray-600">Sin garantía</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-gray-600">Tasa fija</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-gray-600">Aprobación rápida</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Préstamos Express</h3>
              <p className="text-gray-600 mb-6">
                Dinero en tu cuenta en menos de 2 horas. Ideal para emergencias.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-gray-600">Hasta $500.000</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-gray-600">2 horas de aprobación</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-gray-600">Mínimos requisitos</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Refinanciación</h3>
              <p className="text-gray-600 mb-6">
                Unificá tus deudas en una sola cuota más baja y cómoda.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-gray-600">Cuota más baja</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-gray-600">Un solo pago</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-gray-600">Mejor organización</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculadora" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Calculá tu Préstamo
            </h2>
            <p className="text-xl text-gray-600">
              Descubrí cuánto podés pedir y cuál sería tu cuota mensual
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Monto del préstamo
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="range"
                      min="10000"
                      max="2000000"
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>$10.000</span>
                      <span>$2.000.000</span>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-3xl font-bold text-pink-600">
                      {loanAmount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Plazo en meses
                  </label>
                  <input
                    type="range"
                    min="6"
                    max="60"
                    step="6"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>6 meses</span>
                    <span>60 meses</span>
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-2xl font-bold text-gray-700">
                      {loanTerm} meses
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 flex flex-col justify-center">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700">Tu cuota mensual sería:</h3>
                  <div className="text-4xl font-bold text-pink-600">
                    {calculateMonthlyPayment()}
                  </div>
                  <p className="text-sm text-gray-600">
                    *Cálculo estimativo. La tasa final puede variar según tu perfil crediticio.
                  </p>
                  <button 
                    onClick={() => scrollToSection('contacto')}
                    className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                  >
                    Solicitar este préstamo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                ¿Por qué elegir Comarfin?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Somos una empresa familiar con más de 15 años de experiencia en el sector financiero, 
                comprometidos con brindar soluciones accesibles y transparentes a las familias de Buenos Aires.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <Users className="text-pink-600 mx-auto mb-2" size={32} />
                  <div className="text-2xl font-bold text-gray-900">+5000</div>
                  <div className="text-sm text-gray-600">Clientes satisfechos</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Shield className="text-blue-600 mx-auto mb-2" size={32} />
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Seguridad garantizada</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Transparencia total</h4>
                    <p className="text-gray-600">Sin costos ocultos ni sorpresas en tu préstamo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Atención personalizada</h4>
                    <p className="text-gray-600">Te acompañamos en todo el proceso</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Respuesta rápida</h4>
                    <p className="text-gray-600">Evaluamos tu solicitud en menos de 24 horas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Lo que dicen nuestros clientes</h3>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-current" size={16} />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-3">
                      "Excelente atención y muy rápidos. Me aprobaron el préstamo en el mismo día."
                    </p>
                    <div className="text-sm font-semibold text-gray-900">María González</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-current" size={16} />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-3">
                      "Muy transparentes con las condiciones. Sin sorpresas ni letra chica."
                    </p>
                    <div className="text-sm font-semibold text-gray-900">Carlos Rodríguez</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Contactanos
            </h2>
            <p className="text-xl text-gray-600">
              Estamos listos para ayudarte a conseguir tu préstamo
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-pink-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Teléfono</h4>
                      <p className="text-gray-600">+54 11 4567-8900</p>
                      <p className="text-sm text-gray-500">Lunes a Viernes 9:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">info@comarfin.com.ar</p>
                      <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Ubicación</h4>
                      <p className="text-gray-600">Provincia de Buenos Aires</p>
                      <p className="text-sm text-gray-500">Atendemos toda la provincia</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Horarios</h4>
                      <p className="text-gray-600">Lun - Vie: 9:00 - 18:00</p>
                      <p className="text-gray-600">Sáb: 9:00 - 13:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm initialAmount={loanAmount} initialTerm={loanTerm} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <img src="/image.png" alt="Comarfin" className="h-10 w-auto brightness-0 invert" />
              <p className="text-gray-400">
                Tu socio financiero de confianza en la Provincia de Buenos Aires.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Préstamos Personales</li>
                <li>Préstamos Express</li>
                <li>Refinanciación</li>
                <li>Asesoramiento</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Nosotros</li>
                <li>Términos y Condiciones</li>
                <li>Política de Privacidad</li>
                <li>Preguntas Frecuentes</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+54 11 4567-8900</li>
                <li>info@comarfin.com.ar</li>
                <li>Provincia de Buenos Aires</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Comarfin. Todos los derechos reservados.</p>
            <p className="text-sm mt-2">
              No rompas el chanchito, pedí un préstamo en Comarfin 🐷💰
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;