# Controller

É a primeira camada a ser executada. É ela que interage com os sistemas externos (**postman, websites, outras APIs, etc**). É nessa camada que chegam as requisições e são devolvidas as respostas. Seu trabalho é fazer a comunicação inicial entre as camadas e conversar diretamente com a **Business**.

# Business

Recebe ordens da **Controller** para executar a ação especificada. Esta é a parte principal **da aplicação, pois guarda as **lógicas** e as **regras de negócio.** É aqui que fica centralizada a maior parte das **dependências da aplicação, sendo a camada que possui a maior quantidade de código.**

# Database

Recebe ordens da **Business** para executar ações no banco de dados. Toda configuração com o banco de dados se concentra nessa camada e é ela que guarda a lógica de *queries* da aplicação.

# Router

É aqui que fica a configuração de todos os endpoints.

# Outras camadas

Quando aplicarmos autenticação e autorização teremos uma nova camada chamada **Services**. Ela receberá ordens da **Business** e será responsável por centralizar códigos de dependências externas (geração de token, geração de ids e gestão de criptografia).