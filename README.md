# Instabuy E-commerce

Processo seletivo - Desenvolvedor Front-End (Estágio) Instabuy.

## Como Rodar

```bash
# Desenvolvimento
make dev

# Produção
make prod

# Parar
make stop
```

Acesse: http://localhost:3000

## Estrutura

```
src/
├── assets/        # Imagens e arquivos estáticos
├── components/    # Componentes reutilizáveis
├── hooks/         # Custom hooks
├── pages/         # Páginas da aplicação
├── services/      # Chamadas de API
├── styles/        # CSS global
├── tests/         # Testes unitários
├── utils/         # Funções utilitárias
├── App.jsx        # Componente raiz
└── main.jsx       # Entry point

docker/
├── Dockerfile     # Produção
├── Dockerfile.dev # Desenvolvimento
└── nginx.conf     # Servidor web
```

## Tecnologias

- React 18
- Vite
- TailwindCSS
- Docker

## Autor

Johnny Lopes