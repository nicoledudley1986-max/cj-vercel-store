'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/cj')
      .then(r => r.json())
      .then(data => {
        if (data.result) {
          // If we only get token, it means CJ key works but no products yet
          setError('CJ Connected! Now add products in CJ App > My Products');
          setProducts([]);
        } else if (data.products) {
          setProducts(data.products);
        } else if (data.error) {
          setError(data.error);
        } else {
          // Show raw CJ data for now
          setProducts([{ 
            name: 'CJ Connected Successfully!', 
            price: 'Add products in CJ App',
            images: ['https://via.placeholder.com/300'],
            id: 'test'
          }]);
        }
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return <div style={{padding:40,textAlign:'center'}}>Connecting to CJ... please wait</div>;

  return (
    <div style={{padding:20,maxWidth:1100,margin:'0 auto'}}>
      <h1 style={{fontSize:32,marginBottom:10}}>My CJ Vercel Store</h1>
      <p style={{opacity:0.7,marginBottom:20}}>{error || `${products.length} products from CJ`}</p>
      
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:20}}>
        {products.map(p => (
          <div key={p.id} style={{border:'1px solid #333',borderRadius:12,padding:12,background:'#111'}}>
            <img src={p.images?.[0] || 'https://via.placeholder.com/300'} style={{width:'100%',height:200,objectFit:'cover',borderRadius:8}} />
            <h3 style={{margin:'10px 0',fontSize:16}}>{p.name}</h3>
            <p style={{color:'#f97316',fontWeight:'bold'}}>${p.price}</p>
            <button style={{width:'100%',marginTop:10,padding:10,background:'#f97316',border:0,borderRadius:8,color:'white',fontWeight:'bold'}}>Buy Now</button>
          </div>
        ))}
      </div>

      <div style={{marginTop:40,padding:20,background:'#111',borderRadius:12}}>
        <h3>Next Steps:</h3>
        <p>1. Go to Vercel.com → Import this repo → Add env CJ_API_KEY</p>
        <p>2. In CJ App, add products to My Products</p>
        <p>3. Your store will auto-show them!</p>
      </div>
    </div>
  );
    }
