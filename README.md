# MS Delivery

Sistema de delivery no qual é possível criar uma conta como restaurante ou como cliente. Restaurantes podem gerenciar seus pratos e acompanhar as vendas, enquanto clientes podem explorar opções e realizar pedidos com praticidade.

---

## 🚀 Funcionalidades

- Cadastro e login de usuários e restaurantes
- Painel de administração para restaurantes
- Criação e gerenciamento de produtos (pratos)
- Gerenciamento de pedidos (criar, aceitar, recusar, concluir)
- Avaliações de usuários para restaurantes
- Chat em tempo real entre cliente e restaurante

🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando uma stack moderna e robusta, com foco em performance, escalabilidade e experiência do usuário. Abaixo estão as principais tecnologias utilizadas:

---

🔧 Front-end

- Next.js – Framework React para aplicações web otimizadas com SSR e rotas automáticas.
- React 19 (Release Candidate) – Biblioteca principal para criação da UI.
- Tailwind CSS – Utilitário de estilos para desenvolvimento rápido e responsivo.
- GSAP + @gsap/react – Biblioteca para animações fluidas e interativas.
- React Hook Form + Zod + @hookform/resolvers – Gerenciamento eficiente de formulários com validações tipadas.
- React Icons – Ícones prontos para uso com suporte a múltiplas bibliotecas.
- React ChartJS 2 + Chart.js – Visualização de dados com gráficos dinâmicos.
- React Leaflet + Leaflet – Integração de mapas interativos.
- React Toastify – Notificações toast elegantes e configuráveis.

---

💬 Funcionalidades em Tempo Real

- Socket.IO (cliente) – Comunicação em tempo real para funcionalidades como chat ao vivo.

---

🌐 Integração e Consumo de APIs

- Axios – Cliente HTTP para integração com backends e APIs externas.

---

🗺️ Geolocalização e Rotas

- OpenRouteService JS – Cálculo de rotas, distâncias e geocodificação usando mapas.

---

🔐 Autenticação e Sessão

- Nookies – Gerenciamento de cookies no lado do servidor e cliente.

---


📦 Deploy
- Vercel – Plataforma de deploy e hospedagem otimizada para projetos Next.js, com CI/CD integrado.

---

🧪 Outras Bibliotecas
- Day.js – Manipulação de datas simples e leve.
- Radix UI (Dialog) – Componentes acessíveis e estilizados via Tailwind.
- TanStack React Query – Gerenciamento de dados assíncronos com cache e reatividade.
- Edgestore - Uploads e gerenciamento de arquivos com integração edge-ready.

🚀 Iniciando o Projeto
Siga os passos abaixo para rodar o MS-Delivery localmente:

1. Clone o repositório

```
git clone https://github.com/Myst1-Dev1/MS-Delivery.git
cd MS-Delivery

```

2. Instale as dependências

```
npm install

```

3. Configure as váriaveis de ambiente

```
Crie um arquivo .env com para a utilização do upload do edgestore ao criar um restaurante com banner, logo ou um prato que possui uma imagem

EDGE_STORE_ACCESS_KEY=your_access_key
EDGE_STORE_SECRET_KEY=your_secret_key

```

4. Rode o projeto
```
npm run dev

```
📚 Api utilizada

```

https://ms-delivery-api.onrender.com/api-docs/

```
