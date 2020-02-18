# Angular Js 1.x

Estudos com AngularJs

## Estrutura de Diretórios

```
app/                    -> arquivos da aplicação
    css/                -> arquivos css
        app.css         -> default stylesheet
    js/                 -> componentes javascript da aplicação
        controllers/        -> diretório para os controllers
            loginCtrl.js    -> login controller
            parkingCtrl.js  -> parking controller
            carCtrl.js      -> car controller
        directives/         -> diretório para os directives
        filters/            -> diretório para os filters
        services/           -> diretório para os services
        app.js              -> principal script da aplicação
    lib/                -> bibliotecas javascript
        angular.js      -> AngularJS
    partials/           -> diretório para as partial views
        login.html      -> login view
        parking.html    -> parking view
        car.html        -> car view
    index.html          -> principal arquivo html
```

###Ngs  
-ng-app -> Cria a aplicação
-ng-controller -> associa uma função a tela
-ng-module -> cria vinculo entre campos e tela

###Utils
-Json Server uma lib capaz de criar uma api fake funciona no http://localhost/3000

    - npm install -g json-server

- iniciar o servidor

  - json-server -watch nomeArquivo.json

## Projetos

- []()

**Helpers**

- [Format GitHub](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)
