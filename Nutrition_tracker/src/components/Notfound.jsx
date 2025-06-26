import { Link } from "react-router-dom"
export default function Notfound()
{
    return(
        <section className="container nf" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh'}}>
            <div className="not-found" style={{background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: '48px 32px', maxWidth: 400, width: '100%'}}>
                <h1 style={{fontSize: '2.5rem', margin: 0, color: '#167ce0', fontWeight: 700}}>404</h1>
                <p style={{fontSize: '1.2rem', color: '#888', margin: '12px 0 24px 0'}}>Page Not Found</p>
                <Link to="/register" className="btn" style={{display: 'inline-block', textDecoration: 'none', marginTop: 8}}>Register Now</Link>
            </div>
        </section>
    )
}
