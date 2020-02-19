package com.tef.resource;

import com.tef.entity.Product;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import java.util.ArrayList;
import java.util.List;

@Path("/products")
public class ProductResource {
	
	private static final String CHARSET_UTF8 = ";charset=utf-8";

    private static Integer contador = 1;
    static List<Product> products = new ArrayList<Product>();   

  
    public ProductResource() {
    	System.out.println(products);       
    }

    @GET
    @Produces("text/plain")
    public String api(){
        return "Hello World";
    }

    @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Product> listProducts() {
        return products;
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
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
    @Consumes(MediaType.APPLICATION_JSON + CHARSET_UTF8)
    @Produces(MediaType.APPLICATION_JSON)
    public Product addProduct(Product product) {
    	
        product.setId(contador++);
        products.add(product);
        
        return product;
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON + CHARSET_UTF8)
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
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON + CHARSET_UTF8)
    public void deleteProduct(@PathParam("id") Integer id) {
        for (Product p : products) {
            if (p.getId().equals(id)) {
                products.remove(p);
                break;
            }

        }
    }


}
