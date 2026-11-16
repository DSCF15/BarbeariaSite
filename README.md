# Barbearia J · Site

Site de apresentação da Barbearia J, na Camacha (Madeira). Mostra os serviços com preços e duração,
uma galeria de trabalhos, produtos à venda, o mapa com a localização e as ligações para as redes sociais.

## Funcionalidades

- **Serviços e preços:** lista de cortes, barba e tratamentos, com o preço e o tempo de cada um.
- **Galeria:** fotografias de trabalhos em carrossel (Swiper).
- **Produtos:** cartões com os produtos da barbearia.
- **Localização:** mapa interativo com Leaflet.
- **Imagens otimizadas:** scripts que redimensionam as fotografias e geram versões `.jpg` e `.webp`.
- **Pronto para Apache:** `.htaccess` que encaminha todas as rotas para a aplicação.

## Stack

React 18 · Vite · Tailwind CSS · Swiper · Leaflet · Sharp / Jimp (otimização de imagens)

## Estrutura

```
client/
  src/App.jsx              página principal e secções
  src/components/          Gallery, ProductCard
  src/assets/              imagens originais e otimizadas
  scripts/                 otimização de imagens (sharp e jimp)
  .htaccess                regras de reescrita para alojamento Apache
```

## Começar

```bash
cd client
npm install
npm run dev        # http://localhost:5173
npm run build      # gera a versão final em client/dist
npm run preview    # pré-visualiza a versão final
```

### Otimizar imagens

Coloca as fotografias em `client/src/assets/stock` e corre:

```bash
cd client
node scripts/optimize-sharp.js
```

As versões otimizadas ficam em `client/src/assets/optimized`.

## Deploy

Corre `npm run build` e envia o conteúdo de `client/dist` e o ficheiro `.htaccess` para o alojamento.

## Autor

**David França** · [Portefólio](https://github.com/DSCF15/portfolio-david) · [LinkedIn](https://www.linkedin.com/in/david-fran%C3%A7a-281418260/)
