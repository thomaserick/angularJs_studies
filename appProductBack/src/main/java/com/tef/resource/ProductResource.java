package com.tef.resource;

import com.tef.entity.Product;


import javax.ws.rs.*;
import java.util.ArrayList;
import java.util.List;

@Path("products")
public class ProductResource {

    static Integer cont;
    List<Product> products;

    public ProductResource() {
        products = new ArrayList<Product>();
    }

    @GET
    public String api(){
        return "Hello World";
    }

    @GET
    @Path("/list")
    public List<Product> listProducts() {
        return products;
    }

    @GET
    @Path("/get/{id}")
    public Product productId(@PathParam("id") Integer id) {
        for (Product p : products) {
            if(p.getId().equals(id)){
                return p;
            }
        }
        return null;

    }

    @POST
    @Path("/add")
    public void addProduct(Product product) {
        product.setId(cont++);
        products.add(product);
    }

    @PUT
    @Path("/edit/{id}")
    public void editProduct(@PathParam("id") Integer id, Product product) {
        for (Product p : products) {
            if (p.getId().equals(id)) {
                p.setDescription(product.getDescription());
                p.setPrice(product.getPrice());
                break;
            }

        }

    }

    @DELETE
    @Path("/delete/{id}")
    public void deleteProduct(@PathParam("id") Integer id) {
        for (Product p : products) {
            if (p.getId().equals(id)) {
                products.remove(p);
                break;
            }

        }
    }


}
