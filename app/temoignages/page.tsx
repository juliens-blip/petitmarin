import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel'

export default function TemoignagesPage() {
  const allTestimonials = [
    {
      name: 'Pierre M.',
      location: 'Marseille',
      purchase: 'Voilier 10m',
      text: 'Grâce à NaviGuide, j\'ai évité de nombreux pièges lors de l\'achat de mon premier voilier. La formation sur l\'inspection technique m\'a permis de repérer des défauts cachés que le vendeur n\'avait pas mentionnés. J\'ai économisé au moins 5000€ de réparations !',
      rating: 5,
    },
    {
      name: 'Sophie D.',
      location: 'La Rochelle',
      purchase: 'Catamaran 12m',
      text: 'Les modules sur l\'inspection technique m\'ont permis d\'économiser des milliers d\'euros en détectant les problèmes avant l\'achat. Le module sur la négociation m\'a aussi beaucoup aidé à obtenir un meilleur prix.',
      rating: 5,
    },
    {
      name: 'Marc L.',
      location: 'Brest',
      purchase: 'Bateau à moteur 8m',
      text: 'Formation claire et structurée. J\'ai particulièrement apprécié les checklists téléchargeables que j\'ai utilisées lors de mes visites. Le support par email est très réactif et les réponses sont toujours pertinentes.',
      rating: 5,
    },
    {
      name: 'Anne C.',
      location: 'Nice',
      purchase: 'Voilier 9m',
      text: 'Excellent investissement ! Je me sens maintenant capable de négocier et d\'acheter mon bateau en toute confiance. Les conseils sur le financement m\'ont permis d\'obtenir un prêt à un taux avantageux.',
      rating: 5,
    },
    {
      name: 'Thomas R.',
      location: 'Bordeaux',
      purchase: 'Semi-rigide 7m',
      text: 'Je recommande vivement cette formation à tous ceux qui envisagent d\'acheter un bateau. Même pour un bateau d\'occasion récent, les conseils sont précieux et permettent d\'éviter les arnaques.',
      rating: 5,
    },
    {
      name: 'Julie B.',
      location: 'Lorient',
      purchase: 'Voilier habitable 11m',
      text: 'Les modules sont très complets et bien expliqués. J\'ai pu avancer à mon rythme et revoir certaines parties plusieurs fois. Le module sur les aspects juridiques m\'a évité plusieurs erreurs administratives.',
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-[400px] flex items-center justify-center text-white"
        style={{
          background: `linear-gradient(135deg, rgba(36, 107, 253, 0.82), rgba(25, 195, 125, 0.72)), url('https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1600') center/cover no-repeat`,
        }}
      >
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Témoignages
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Découvrez les retours d'expérience de nos clients satisfaits
          </p>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Témoignages en vedette
            </h2>
            <p className="text-lg text-gray-600">
              Ils ont réussi leur achat grâce à NaviGuide
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tous les témoignages
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {allTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  <p className="text-[#007bff] text-sm font-medium mt-1">
                    {testimonial.purchase}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 text-white"
        style={{
          background: 'linear-gradient(135deg, rgba(36, 107, 253, 0.9), rgba(25, 195, 125, 0.9))',
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Rejoignez-les !
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Commencez votre formation dès aujourd'hui et réussissez votre achat
            </p>
            <a
              href="/programmes"
              className="inline-block px-8 py-4 bg-white text-[#007bff] rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-xl"
            >
              Voir les programmes
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
