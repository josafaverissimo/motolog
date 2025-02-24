# Motolog

[App demo](https://github.com/user-attachments/assets/bbe75611-d6ab-473e-a8d0-a3f254174b10)

## Comece por aqui

### Inicializando a aplicação

Basta simplesmente executar na raiz do projeto:
```sh
docker compose up -d --build
```

Garanta que as seguintes portas estejam livres:
- 5711: para o frontend
- 5712: para a api
- 5713: para o banco de dados
- 9000: para o minio
- 9001: também para o minio

## Todo
- [ ] Corrigir paginação
- [ ] Recarregar dados dos motoristas ao inserir/editar um registro

## Tecnologias utilizadas

- NextJS + ReactJS
- Tailwind + ShadCn/UI
- Elysia
- Docker
- Minio
