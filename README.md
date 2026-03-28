# microservicos_produto
Projeto baseado em arquitetura de microsserviços, composto por cinco domínios independentes:

👤 User

📦 Products

🧾 Orders

🧾 Inventory

🧾 Payment

Cada serviço possui:
- Banco de dados próprio
- API REST própria
- Execução independente
- Comunicação síncrona via HTTP (REST)

# Instruções do Projeto

1. Clonar o repositório:

`git clone https://github.com/Rafaela-Mello/microservicos_produto.git`

2. Estrutura do Projeto

ecommerce-microservices/
├── product-service/       # Porta 3001
├── user-service/          # Porta 3002
├── inventory-service/     # Porta 3003
├── payment-service/       # Porta 3004
└── order-service/         # Porta 3005 (Orquestrador)

3. Instalar as dependências (em cada serviço):

`npm install`

4. Executando cada serviço:

`npm start`

5. Cada microsserviço roda em sua própria porta (definida no .env.example).

6. Utilize o ThunderClient (extensão do VS Code) ou qualquer cliente HTTP (Postman, Insomnia) para testar os endpoints.







CHECKLIST
- OK Service User ------------
- OK Service Product ---------
- OK Service Inventory -------

- Service Order
- Service Payment
FALTA O PAYMENT SIMULAR O PAGAMENTO NO PEDIDO E O PEDIDO ATUALIZAR QUANDO FORMOS BUSCAR ELE


- mudar as portas pela ordem dps direito
- mudar diagrama pq ta errado algumas res kkkkkk