![logo_codelicias](./small_logo.png)

# Escopo 'Collection API'

## O que o usuário pode fazer

- Fazer Login
- Fazer Cadastro
- Ver os dados do seu perfil
- Editar os dados do perfil
- Cadastrar Clientes
- Editar Clientes
- Cadastrar Cobranças
- Editar Cobranças

## Endpoints

### Cadastro do Usuário - Nome e Email

#### `POST` `/user`

#### Dados Enviados - obrigatórios

- Nome
- Email

```json=
{
  "name": "Carla Almeida",
  "email": "carla@teste.com"
}

```

#### Dados Retornados

- mensagem de sucesso / erro

```json=
{
"newUser":{
  "name": "Carla Almeida",
  "email": "carla@teste.com"
},
"mensagem": "Prossiga e digite sua senha"
}
```

```json=
{
"mensagem": "Email já cadastrado."
}
```

#### Objetivos Gerais

- validar nome e email
- verificar se o email já existe no banco de dados
- retornar sucesso e prosseguir para o cadastro da senha/ erro

---

### Cadastro do Usuário - Senha

#### `POST` `/password`

#### Dados Enviados - obrigatórios

- Senha (mínimo 06 caracteres)

```json=

{
  "password":"123456"
}

```

#### Dados Retornados

- mensagem de sucesso / erro

```json=
{
  "mensagem": "Cadastro realizado com sucesso!"
}
```

```json=
{
  "mensagem": "password deve ter pelo menos 6 caracteres"
}
```

#### Objetivos Gerais

- validar senha
- criptografar a senha
- cadastrar o usuário no banco de dados
- retornar sucesso ou erro

---

### Login

#### `POST` `/login`

#### Dados Enviados - obrigatórios

- Email
- Senha

```json=
{
  "email": "carla@teste.com",
  "password":"123456"
}
```

#### Dados Retornados

- token / erro

```json=
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ik..."
}
```

```json=
{
  "mensagem": "Email e senha não conferem."
}
```

#### Objetivos Gerais

- validar email e senha
- buscar o usuário no banco de dados
- verificar se a senha está correta
- gerar o token de autenticação
- retornar os dados do usuário e token ou mensagem de erro

---

### Obter Perfil

#### `GET` `/user`

#### Dados Enviados

- token (id)

#### Dados Retornados

- Nome
- Email
- CPF
- Telefone

```json=
{
  "id": 1,
  "name": "Carla",
  "email": "carla@teste.com",
  "cpf": null,
  "telephone": null
}
```

#### Objetivos Gerais

- validar o token
- buscar o cadastro do usuário de acordo com os dados do token
- retornar os dados do usuário ou erro

---

### Editar Perfil

#### `PUT` `/user`

#### Dados Enviados

- token (id)
- Nome - obrigatório
- Email - obrigatório
- Senha
- CPF
- Telefone

```json=
{
  "name": "Ana Carla Almeida",
  "email": "carla@teste.com",
  "password":"142536",
  "cpf":"22222222222",
  "telephone":"11999999999"
}
```

#### Dados Retornados

- mensagem de sucesso / erro

```json=
{
  "editedProfile": [
  {
    "id": 1,
    "name": "Ana Carla Almeida",
    "email": "carla@teste.com",
    "cpf": "22222222222",
     "telephone": "11999999999"
  }
],
  "mensagem": "Cadastro Alterado com sucesso!"
}
```

```json=
{
  "mensagem": "E-mail já cadastrado!"
}
```

#### Objetivos Gerais

- validar o token
- buscar o cadastro do usuário conforme os dados no token
- exigir e validar os campos obrigatórios
- verificar se já existe usuário cadastrado no banco de dados com e-mail informado
- se informada, criptografar nova senha
- atualizar os dados do usuário no banco de dados ou erro

---

### Cadastrar Cliente

#### `POST` `/client`

#### Dados Enviados

- token (id)
- Nome (obrigatório)
- Email (obrigatório)
- CPF (obrigatório)
- Telefone (obrigatório)
- CEP
- Logradouro
- Complemento
- Bairro
- Cidade
- Estado

```json=
{
  "name": "Maria",
  "email":"maria@email.com",
  "cpf": "22222222222",
  "telephone": "11999999999",
  "zip_code": "01310000",
  "address": "AV Paulista, 100",
  "address_2": "Ap 20",
  "district": "Bela Vista",
  "city": "São Paulo",
  "uf": "SP"
}
```

#### Dados Retornados

- mensagem sucesso / erro

```json=
{
  "id": 1,
  "user_id": 1,
  "name": "Maria",
  "email":"maria@email.com",
  "cpf": "22222222222",
  "telephone": "11999999999",
  "zip_code": "01310000",
  "address": "AV Paulista, 100",
  "address_2": "Ap 20",
  "district": "Bela Vista",
  "city": "São Paulo",
  "uf": "SP"
}
```

```json=
{
  "mensagem": "Email já cadastrado."
}
```

#### Objetivos Gerais

- validar o token
- buscar o cadastro do usuário conforme os dados no token
- exigir e validar os campos obrigatórios
- verificar no banco de dados se já existe cliente cadastrado com o e-mail e CPF informados
- cadastrar o cliente no banco de dados vinculado ao id do usuário logado
- retornar mensagem de sucesso ou erro

---

### Editar Cliente

#### `PUT` `/client/:id`

#### Dados Enviados

- token (id)
- Nome (obrigatório)
- Email (obrigatório)
- CPF (obrigatório)
- Telefone (obrigatório)
- CEP
- Logradouro
- Complemento
- Bairro
- Cidade
- Estado

```json=
{
  "id": 1,
  "name": "Maria Editado",
  "email":"maria1@email.com",
  "cpf": "22222222222",
  "telephone": "11999999999",
  "zip_code": "01310000",
  "address": "AV Paulista, 100",
  "address_2": "Ap 20",
  "district": "Bela Vista",
  "city": "São Paulo",
  "uf": "SP"
}
```

#### Dados Retornados

- mensagem sucesso / erro

```json=
{
  "id": 1,
  "user_id": 1,
  "name": "Maria1",
  "email":"maria1@email.com",
  "cpf": "22222222222",
  "telephone": "11999999999",
  "zip_code": "01310000",
  "address": "AV Paulista, 100",
  "address_2": "Ap 20",
  "district": "Bela Vista",
  "city": "São Paulo",
  "uf": "SP"
}
```

```json=
{
  "mensagem": "Não foi possível atualizar o cliente."
}
```

#### Objetivos Gerais

- validar o token
- buscar o cadastro do usuário conforme os dados no token
- exigir os campos obrigatórios
- verificar no banco de dados se já existe cliente cadastrado com o e-mail e CPF informados
- editar o cadastro do cliente no banco de dados
- retornar mensagem de sucesso ou erro

---

### Listar Clientes

#### `GET` `/clients/`

#### Dados Enviados

- token (id)

#### Dados Retornados

- Clientes[ ] \*ordem crescente por id
  - Id do Cliente
  - Id do Usuário que o cadastrou
  - Nome
  - Email
  - CPF
  - Telefone
  - CEP
  - Logradouro
  - Complemento
  - Bairro
  - Cidade
  - Estado
  - Status de adimplência

```json=
[
  {
    "id": 2,
    "user_id": 11,
    "name": "José",
    "email": "jose@email.com",
    "cpf": "02502502500",
    "telephone": "1199999999",
    "zip_code": null,
    "address": null,
    "address_2": null,
    "district": null,
    "city": null,
    "uf": null,
    "status" : "em dia"
  },
  {
    "id": 3,
    "user_id": 11,
    "name": "Maria",
    "email": "maria@email.com",
    "cpf": "22222222220",
    "telephone": "1199999999",
    "zip_code": "01310000",
    "address": "AV Paulista, 100",
    "address_2": "Ap 20",
    "district": "Bela Vista",
    "city": "São Paulo",
    "uf": "SP",
    "status" : "inadimplente"
  },
]
```

```json=
{
  "mensagem": "Usuário não encontrado."
}
```

#### Objetivos Gerais

- validar o token
- buscar o cadastro do usuário conforme os dados no token
- retornar todos os clientes cadastrados pelo usuário logado

---

### Cadastrar Cobrança

#### `POST` `/charge/:client_id`

#### Dados Enviados

- token (id)
- Id do Cliente (obrigatório)
- Descrição (obrigatório)
- Data de vencimento (obrigatório)
- Valor em formato inteiro e positivo (obrigatório)

```json=
{
	"description": "Boleto",
	"maturity_date": "12/15/2021"*
	"amount": "5000"
}

*formato: mm/dd/aaaa
```

#### Dados Retornados

- mensagem sucesso / erro

```json=

  {
  "id": 1,
  "client_id": 1,
  "description": "Boleto",
  "maturity_date": "2021-12-15T00:00:00.000Z",
  "amount": 5000,
  "paid": false
  }
```

```json=
{
  "mensagem": "Não foi possível cadastrar a cobrança."
}
```

#### Objetivos Gerais

- validar o token
- buscar o cadastro do usuário conforme os dados no token
- exigir e validar os campos obrigatórios
- buscar no banco de dados o cliente informado
- cadastrar no banco de dados a cobrança vinculada ao id do cliente informado
- retornar mensagem de sucesso ou erro

---

### Editar Cobrança

#### `PUT` `/charge/:id`

#### Dados Enviados

- token (id)
- Descrição (obrigatório)
- Data de vencimento(obrigatório)
- Valor em formato inteiro e positivo (obrigatório)
- Status (obrigatório)
- Id do Cliente (obrigatório)

```json=
{
  "description": "Boleto",
  "maturity_date": "12/15/2021",
  "amount": "5000",
  "paid": true
}

```

#### Dados Retornados

- mensagem sucesso / erro

```json=

  {
  "id": 1,
  "client_id": 1,
  "description": "Boleto",
  "maturity_date": "2021-12-15T00:00:00.000Z",
  "amount": 5000,
  "paid": true
  }

```

```json=
{
  "mensagem": "Não foi possível atualizar a cobrança."
}
```

#### Objetivos Gerais

- validar o token
- buscar o cadastro do usuário conforme os dados no token
- exigir e validar os campos obrigatórios
- buscar no banco de dados a cobrança pelo id
- editar no banco de dados a cobrança
- retornar mensagem de sucesso ou erro

---

### Listar Cobranças

#### `GET` `/charges/`

#### Dados Enviados

- token (id)

#### Dados Retornados

- Cobranças[ ]\* ordem descrescente por id
  - Id
  - Cliente_id
  - Descrição
  - Data de Vencimento
  - Valor (inteiro e positivo)
  - Pago (true/ false)
  - Nome do cliente

```json
[
  {
    "id": 2,
    "client_id": 1,
    "description": "Boleto",
    "maturity_date": "2021-12-15T00:00:00.000Z",
    "amount": 3000,
    "paid": false,
    "name": "Maria"
  },
  {
    "id": 1,
    "client_id": 2,
    "description": "Cartão de Crédito",
    "maturity_date": "2010-10-10T03:00:00.000Z",
    "amount": 5000,
    "paid": true,
    "name": "Bruna"
  }
]
```

#### Objetivos Gerais

- validar o token
- buscar o cadastro do usuário conforme os dados no token
- retornar todas as cobranças cadastradas pelo usuário

---

### Listar Cobranças por cliente

#### `GET` `/charges/:client_id`

#### Dados Enviados

- token (id)
- - Id do Cliente (obrigatório)

#### Dados Retornados

- Cobranças[ ]
  - Id
  - Cliente_id
  - Descrição
  - Data de Vencimento
  - Valor (inteiro e positivo)
  - Pago (true/ false)
  - Nome do cliente

```json
[
  {
    "id": 1,
    "client_id": 1,
    "description": "Boleto",
    "maturity_date": "2021-12-15T00:00:00.000Z",
    "amount": 5000,
    "paid": false,
    "name": "Maria"
  },
  {
    "id": 17,
    "client_id": 1,
    "description": "Boleto",
    "maturity_date": "2021-10-01T03:00:00.000Z",
    "amount": 3000,
    "paid": true,
    "name": "Maria"
  }
]
```

#### Objetivos Gerais

- validar o token
- buscar o cadastro do usuário conforme os dados no token
- retornar todas as cobranças do cliente

---

### Excluir Cobranças

#### `DELETE` `/charge/:id`

#### Dados Enviados

- token (id)

#### Dados Retornados

- mensagem sucesso / erro

```json=
{
  "mensagem": "Cobrança excluída com sucesso."
}
```

```json=
{
  "mensagem": "Não foi possível excluir a cobrança."
}
```

#### Objetivos Gerais

- validar o token
- buscar o cadastro do usuário conforme os dados no token
- exigir e validar os campos obrigatórios
- buscar no banco de dados a cobrança pelo id
- verificar status da cobrança, se paga ou vencida
- excluir no banco de dados a cobrança
- retornar mensagem de sucesso ou erro

---

### Estrutura do banco de dados

#### database collection_api

#### Table 'users'

    id serial primary key,
    name text not null,
    email varchar(100) unique not null,
    password text not null,
    cpf char(11) unique,
    telephone varchar(11),

#### Table 'clients'

    id serial primary key,
    users_id int not null,
    name text not null,
    email varchar(100) unique not null,
    cpf char(11) unique not null,
    telephone varchar(11) not null,
    zip_code varchar(8),
    address text,
    address_2 text,
    district text,
    city text,
    uf varchar(2),
    foreign key (users_id) references users (id)

#### Table 'collections'

    id serial primary key,
    clients_id int not null,
    maturity_date date not null,
    amount int not null,
    foreign key (clients_id ) references clients (id)
