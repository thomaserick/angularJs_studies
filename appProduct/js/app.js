var app = angular.module("produtoApp", ["ngRoute", "ngResource"]);

//Rotas da aplicação
app.config(function($routeProvider) {
  $routeProvider
    .when("/cadProduct", {
      templateUrl: "views/products/insert.html",
      controller: "InsertController"
    })
    .when("/cadProduct/:id", {
      templateUrl: "views/products/insert.html",
      controller: "InsertController"
    })
    .when("/list", {
      templateUrl: "views/products/list.html",
      controller: "listController"
    })
    //Rota default
    .otherwise({
      redirectTo: "/list"
    });
});

app.controller("listController", function($scope, ProdutosService) {
  list();

  function list() {
    $scope.produtos = ProdutosService.list().then(function(produtos) {
      $scope.produtos = produtos;
    });
  }

  //delete
  $scope.delete = function(produto) {
    ProdutosService.delete(produto).then(list);
  };

  //edit
  //$scope.edit = function(produto) {
  // $scope.produto = angular.copy(produto);
  //};
});

app.controller("InsertController", function(
  $routeParams,
  $scope,
  $location,
  ProdutosService
) {
  let id = $routeParams.id;
  if (id) {
    ProdutosService.findById(id).then(function(produto) {
      $scope.produto = produto;
    });
  } else {
    clear();
  }

  $scope.save = function(produto) {
    clear();
    $scope.FormProdutos.$setPristine();
    ProdutosService.save(produto).then(redirectList);
  };

  $scope.cancel = redirectList;

  function clear() {
    $scope.produto = {};
  }

  function redirectList() {
    $location.path("/list");
  }
});

app.service("ProdutosService", function(ProdutosResources) {
  this.findById = function(id) {
    return ProdutosResources.get({ id: id }).$promise;
  };

  this.list = function() {
    return ProdutosResources.getList().$promise;
  };

  this.save = function(produto) {
    if (produto.id) {
      return ProdutosResources.update({ id: produto.id }, produto).$promise;
    } else {
      return ProdutosResources.save(produto).$promise;
    }
  };

  this.delete = function(produto) {
    return ProdutosResources.delete({ id: produto.id }).$promise;
  };
});

app.factory("ProdutosResources", function($resource) {
  return $resource(
    "http://localhost:8085/appServer/api/products/:id",
    {},
    {
      update: {
        method: "PUT",
        params: {
          id: "@id"
        }
      },
      getList: {
        url: "http://localhost:8085/appServer/api/products/list",
        method: "GET",
        isArray: true
      }
    }
  );
});
