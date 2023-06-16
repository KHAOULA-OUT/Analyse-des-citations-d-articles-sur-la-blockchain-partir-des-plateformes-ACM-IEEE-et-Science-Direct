import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    get_nb_articles(){
        return this.http.get('http://127.0.0.1:8000/nb_article');
    }
    get_all_articles(){
        return this.http.get('http://127.0.0.1:8000/all_articles');
    }
    get_countries(){
        return this.http.get('http://127.0.0.1:8000/countries');
    }
    get_countries_citations(){
        return this.http.get('http://127.0.0.1:8000/citationsCountries');
    }
    get_years(){
        return this.http.get('http://127.0.0.1:8000/years');
    }
    get_citations_years(){
        return this.http.get('http://127.0.0.1:8000/citationsByYear');
    }
    get_citations(){
        return this.http.get('http://127.0.0.1:8000/citations');
    }
    get_citations_publisher(){
        return this.http.get('http://127.0.0.1:8000/citationsByPublisher');
    }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
}
