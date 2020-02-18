var app = angular.module("produtoApp", []);

app.controller("ProdutosController", function($scope, ProdutosService) {
  clear();
  $scope.produtos = ProdutosService.list();

  //save
  $scope.save = function(produto) {
    ProdutosService.save(produto);
    clear();
  };

  //delete
  $scope.delete = function(produto) {
    ProdutosService.delete(produto);
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

app.service("ProdutosService", function() {
  let produtos = [
    {
      id: 1,
      description: "Arroz",
      price: 2.5
    },
    {
      id: 2,
      description: "Feijão",
      price: 10.0
    },
    {
      id: 3,
      description: "Sorvete",
      price: 20.0
    }
  ];

  this.list = function() {
    return produtos;
  };

  this.save = function(produto) {
    let findProduct = false;
    for (let i = 0; i < produtos.length; i++) {
      if (produtos[i].id === produto.id) {
        produtos[i].description = produto.description;
        produtos[i].price = produto.price;
        findProduct = true;
        break;
      }
    }
    if (!findProduct) {
      produtos.push(produto);
    }
  };

  this.delete = function(produto) {
    for (let i = 0; i < produtos.length; i++) {
      if (produtos[i].id === produto.id) {
        produtos.splice(i, 1);
      }
    }
  };
});
