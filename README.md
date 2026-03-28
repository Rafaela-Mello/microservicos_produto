# Microsserviços do Projeto
Projeto baseado em arquitetura de microsserviços, composto por cinco domínios independentes:

👤 User Service (Porta 3002) - Gestão de clientes e perfis.

🏷️ Product Service (Porta 3001) - Catálogo e detalhes dos itens.

📦 Inventory Service (Porta 3003) - Controle de estoque e disponibilidade.

💳 Payment Service (Porta 3004) - Processamento de transações financeiras.

🛒 Order Service (Porta 3005) - Orquestrador do fluxo de compras.


Cada serviço possui:
- Banco de dados próprio
- API REST própria
- Execução independente
- Comunicação síncrona via HTTP (REST)

# Instruções do Projeto

1. Clonar o repositório:

`git clone https://github.com/Rafaela-Mello/microservicos_produto.git`

2. Estrutura do Projeto

microservicos-produto/
├── product-service/       # Porta 3001
├── user-service/          # Porta 3002
├── inventory-service/     # Porta 3003
├── payment-service/       # Porta 3004
└── order-service/         # Porta 3005

3. Instalar as dependências (em cada serviço):

`npm install`

4. Executando cada serviço:

`npm start`

5. Cada microsserviço roda em sua própria porta (definida no .env.example).

6. Utilize o ThunderClient (extensão do VS Code) ou qualquer cliente HTTP (Postman, Insomnia) para testar os endpoints.