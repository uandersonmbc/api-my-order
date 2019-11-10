# Aplicação feita em Adonis

Configuração da aplicação.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds
6. Adonis ACL

## Instalar depêndencias

```
npm install
```

### Migrations

Execute o seguinte comando para criar as tabelas no banco de dados.

```
adonis migration:run
```

### Differences between

- https://github.com/enniel/adonis-acl

- find($id) takes an id and returns a single model. If no matching model exist, it returns null.

- findOrFail($id) takes an id and returns a single model. If no matching model exist, it throws an error1.

- first() returns the first record found in the database. If no matching model exist, it returns null.

- firstOrFail() returns the first record found in the database. If no matching model exist, it throws an error1.

- get() returns a collection of models matching the query.

- pluck($column) returns a collection of just the values in the given column. In previous versions of Laravel this method was called lists.

- toArray() converts the model/collection into a simple PHP array.


