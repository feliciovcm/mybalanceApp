import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { createServer, Model } from "miragejs";

createServer({
  // Criando tabela para mockar os dados
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Alugel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-05 11:00:00'),
        },
      ]
    })
  },

  // dizendo em qual rota será feita as requisições
  routes() {
    this.namespace = 'api';

    this.get('transactions', () => {

      // quando receber um get na rota transactions retornar todos os dados cadastrados
      return this.schema.all('transaction')
    })

    // quando receber um post request na rota transactions pegar os dados (data) e adicionar a tabela transactions
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
     
      
      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
