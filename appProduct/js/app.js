var app = angular.module("produtoApp", []);

app.controller("ProdutosController", function($scope, ProdutosService) {
  clear();
  list();

  function list() {
    $scope.produtos = ProdutosService.list().then(function(resposta) {
      $scope.produtos = resposta.data;
    });
  }

  //save
  $scope.save = function(produto) {
    ProdutosService.save(produto).then(list);
    clear();
  };

  //delete
  $scope.delete = function(produto) {
    ProdutosService.delete(produto).then(list());
    clear();
  };

  //edit
  $scope.edit = function(produto) {
    $scope.produto = angular.copy(produto);
  };

  $scope.cancel = function() {
    clear();
  };
  function clear() {
    $scope.produto = {};
  }
});

app.service("ProdutosService", function($http) {
  let baseUrl = "http://localhost:3000/produtos";

  this.list = function() {
    return $http.get(baseUrl);
  };

  this.save = function(produto) {
    if (produto.id) {
      return $http.put(baseUrl + "/" + produto.id, produto);
    } else {
      return $http.post(baseUrl, produto);
    }
  };

  this.delete = function(produto) {
    return $http.delete(baseUrl + "/" + produto.id);
  };
});
