# 🛒 React E-commerce TT - Loja Virtual Completa

## 🎯 Objetivo de Aprendizado
Projeto full-stack de e-commerce desenvolvido para estudar **React + TypeScript** integrado com **Spring Boot**, implementando funcionalidades completas de loja virtual com autenticação, carrinho de compras e gerenciamento de produtos.

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, CSS Modules
- **Estado:** Context API, React Hooks
- **Roteamento:** React Router DOM
- **Backend:** Spring Boot REST API
- **Banco:** MySQL (dev), PostgreSQL (prod)
- **Storage:** Firebase Storage para imagens
- **Deploy:** Vercel (frontend), Railway (backend)

## 🚀 Demonstração
```tsx
// Context API para gerenciamento de estado
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Hook customizado para autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

// Componente com TypeScript
interface ProductProps {
  id: number;
  nome: string;
  preco: number;
  categoria: Category;
}
```

## 📁 Estrutura do Projeto
```
react-ecommerce-tt/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── categories/      # CRUD de categorias
│   │   ├── products/        # CRUD de produtos
│   │   ├── header/          # Navegação e carrinho
│   │   └── footer/          # Rodapé da aplicação
│   ├── contexts/            # Context API (Auth, Cart)
│   ├── models/              # Interfaces TypeScript
│   ├── pages/               # Páginas (Home, Login, Profile)
│   ├── services/            # Integração com API
│   └── utils/               # Funções utilitárias
├── public/                  # Assets estáticos
└── docs/                    # Documentação
```

## 💡 Principais Aprendizados

### ⚛️ React + TypeScript
- **Hooks avançados:** useState, useEffect, useContext, useReducer
- **Context API:** Gerenciamento de estado global
- **TypeScript:** Tipagem estática e interfaces
- **Custom Hooks:** Reutilização de lógica

### 🎨 Interface e UX
- **Tailwind CSS:** Utility-first CSS framework
- **Responsividade:** Design mobile-first
- **Componentes:** Reutilização e composição
- **Formulários:** Validação e controle de estado

### 🔗 Integração Full-Stack
- **REST API:** Consumo de endpoints Spring Boot
- **Autenticação:** JWT tokens e rotas protegidas
- **CRUD completo:** Categorias e produtos
- **Upload de imagens:** Firebase Storage

## 🧠 Conceitos Técnicos Estudados

### 1. **Context API + TypeScript**
```tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // ... lógica de autenticação
};
```

### 2. **Custom Hooks**
```tsx
const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  const addItem = (product: Product) => {
    setItems(prev => [...prev, { ...product, quantity: 1 }]);
  };
  
  return { items, addItem, removeItem, total };
};
```

### 3. **Integração com API**
```tsx
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

## 🚧 Desafios Enfrentados
1. **TypeScript:** Tipagem correta de props e estados
2. **Estado global:** Gerenciar carrinho e autenticação
3. **Integração:** Conectar frontend React com backend Spring
4. **Responsividade:** Layout adaptável para todos dispositivos
5. **Performance:** Otimização de re-renders e lazy loading

## 📚 Recursos Utilizados
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Firebase Documentation](https://firebase.google.com/docs)

## 📈 Próximos Passos
- [ ] Implementar testes com Jest e React Testing Library
- [ ] Adicionar PWA (Progressive Web App)
- [ ] Implementar sistema de pagamento (Stripe)
- [ ] Adicionar notificações push
- [ ] Otimizar SEO com Next.js
- [ ] Implementar chat de suporte

## 🔗 Projetos Relacionados
- [Spring E-commerce Backend](../spring-ecommerce-tt/) - API REST completa
- [Java Generation Notes](../java-generation-notes/) - Base de estudos
- [Sistema Bancário](../contabancaria/) - Fundamentos de POO

---

**Desenvolvido por:** Felipe Macedo  
**Contato:** contato.dev.macedo@gmail.com  
**GitHub:** [FelipeMacedo](https://github.com/felipemacedo1)  
**LinkedIn:** [felipemacedo1](https://linkedin.com/in/felipemacedo1)

> 💡 **Reflexão:** Este projeto consolidou meus conhecimentos em React + TypeScript e integração full-stack. A experiência de conectar frontend moderno com backend Spring Boot foi fundamental para entender arquiteturas web completas.
