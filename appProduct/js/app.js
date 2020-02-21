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

app.service("ProdutosService", function($resource) {
  let api = $resource(
    "http://192.168.1.110:8080/appServer/api/products/:id",
    {},
    {
      update: { method: "PUT" },
      getList: {
        url: "http://192.168.1.110:8080/appServer/api/products/list",
        method: "GET",
        isArray: true
      }
    }
  );

  this.findById = function(id) {
    return api.get({ id: id }).$promise;
  };

  this.list = function() {
    return api.getList().$promise;
  };

  this.save = function(produto) {
    if (produto.id) {
      return $http.put(baseUrl + "/" + produto.id, produto);
    } else {
      return api.save(produto).$promise;
    }
  };

  this.delete = function(produto) {
    return api.delete({ id: produto.id }).$promise;
  };
});
