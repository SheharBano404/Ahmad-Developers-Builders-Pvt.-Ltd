import { WHATSAPP_NUMBER } from '../config'
export const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
export const generalMessage = () => 'Hello, I would like more information about Ahmad Developers & Builders.'
export const propertyMessage = (p) =>
  `Hello, I am interested in ${p.name}. Please share more details and pricing. Property Reference: ${p.ref}.`
