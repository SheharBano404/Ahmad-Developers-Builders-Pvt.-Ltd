import { useSEO } from '../utils/useSEO'
import { ButtonLink } from '../components/ui'
export default function NotFound() {
  useSEO('Page not found')
  return <section className="wrap section" style={{ paddingTop: 160 }}><h1>Page not found</h1><p>The page you are looking for does not exist.</p><p style={{ marginTop: 20 }}><ButtonLink to="/">Go Home</ButtonLink></p></section>
}
