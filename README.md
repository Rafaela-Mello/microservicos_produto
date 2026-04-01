# Microsserviços do Projeto
Projeto baseado em arquitetura de microsserviços, composto por cinco domínios independentes:


🏷️ Product Service (Porta 3001) - Catálogo e detalhes dos itens.

👤 User Service (Porta 3002) - Gestão de clientes.

📦 Inventory Service (Porta 3003) - Controle de estoque e disponibilidade.

💳 Payment Service (Porta 3004) - Processamento de transações financeiras.

🛒 Order Service (Porta 3005) - Orquestrador do fluxo de compras.


Cada serviço possui:
- Banco de dados próprio
- API REST própria
- Execução independente
- Comunicação síncrona via HTTP (REST)

# Pré-requisitos
Para executar este sistema de e-commerce, você precisará ter instalado:

- Node.js
- Gerenciador de Pacotes: npm (instalado com o Node) 
- MySQL Server
- Ferramenta de API: Postman ou Thunder Client

# Instruções do Projeto

1. Clonar o repositório:

`git clone https://github.com/Rafaela-Mello/microservicos_produto.git`

2. Instalar as dependências (em cada serviço):

`npm install`

3. Cada microsserviço roda em sua própria porta (definida no .env.example)

4. Deve-se criar os bancos de dados, usando o script que está no arquivo `script.sql`

5. Executando cada serviço:

`npm start`

6. Utilize o ThunderClient (extensão do VS Code) ou qualquer cliente HTTP para testar os endpoints.

Obs: As requisições para teste via Postman estão no arquivo `req.postman_collection.json`