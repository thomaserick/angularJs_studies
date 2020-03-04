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
    .when("/movement/:id", {
      templateUrl: "views/products/movement.html",
      controller: "InsertController"
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
    ProdutosService.save(produto).then(redirectList, function(erros) {
      $scope.errors = erros.data.message;
    });
  };

  $scope.cancel = redirectList;

  function clear() {
    $scope.produto = {};
  }

  function redirectList() {
    $location.path("/list");
    //$scope.FormProdutos.$setPristine();
  }

  $scope.saveMovementProduct = function(produto, movementProducts) {
    ProdutosService.saveMovementProduct(produto, movementProducts).then(
      function(produto) {
        reloadMovement(produto);
      }
    );
  };

  $scope.deleteMovementProduct = function(idProduto, movementProducts) {
    ProdutosService.deleteMovementProduct(idProduto, movementProducts).then(
      function(produto) {
        console.log(produto);
        $scope.produto = produto;
      }
    );
  };

  function reloadMovement(produto) {
    $scope.produto = produto;
    $scope.movementProducts = {};
    $scope.FormMovimentProduct.$setPristine();
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

  this.deleteMovementProduct = function(idProduto, movementProducts) {
    return ProdutosResources.deleteMovementProduct(
      { id: idProduto },
      { idMovement: movementProducts.id }
    ).$promise;
  };
  this.saveMovementProduct = function(produto, movementProducts) {
    return ProdutosResources.saveMovementProduct(
      { id: produto.id },
      movementProducts
    ).$promise;
  };
});

app.factory("ProdutosResources", function($resource) {
  var baseUrl = "http://localhost:8085/appServer/api/products/";
  return $resource(
    baseUrl + ":id",
    {},
    {
      update: {
        method: "PUT",
        params: {
          id: "@id"
        }
      },
      getList: {
        method: "GET",
        url: baseUrl + "list",
        isArray: true
      },

      save: {
        method: "POST",
        url: baseUrl + "add"
      },
      saveMovementProduct: {
        method: "POST",
        url: baseUrl + ":id/movement",
        params: {
          id: "@id"
        }
      },
      deleteMovementProduct: {
        method: "DELETE",
        url: baseUrl + ":id/movement/:idMovement",
        params: {
          id: "@id",
          idMovement: "@idMovement"
        }
      }
    }
  );
});
