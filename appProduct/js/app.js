var app = angular.module("produtoApp", ["ngRoute"]);

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
    $scope.produtos = ProdutosService.list().then(function(resposta) {
      $scope.produtos = resposta.data;
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
    ProdutosService.findById(id).then(function(response) {
      $scope.produto = response.data;
    });
  } else {
    clear();
  }

  $scope.save = function(produto) {
    clear();
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

app.service("ProdutosService", function($http) {
  let baseUrl = "http://192.168.1.110:8080/appServer/api/products";

  this.findById = function(id) {
    return $http.get(baseUrl + "/" + id);
  };

  this.list = function() {
    return $http.get(baseUrl + "/list");
  };

  this.save = function(produto) {
    if (produto.id) {
      return $http.put(baseUrl + "/" + produto.id, produto);
    } else {
      return $http.post(baseUrl + "/add", produto);
    }
  };

  this.delete = function(produto) {
    return $http.delete(baseUrl + "/" + produto.id);
  };
});
