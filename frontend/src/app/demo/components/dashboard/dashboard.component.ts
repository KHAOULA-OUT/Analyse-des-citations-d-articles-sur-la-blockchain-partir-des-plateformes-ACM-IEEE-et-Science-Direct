import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    total_article : any
    total_ieee : any
    total_sd : any
    total_acm : any;
    
    citations_ieee : any
    citations_sd : any
    citations_acm : any;


    years: string[] = [] ;
    years_count: number[] = [] ;
    citations_count_year: number[] = [] ;
    

    countries_articles: any ;

    countries: string[] = [] ;
    countries_count: number[] = [] ;
    citations_country: number[] = [] ;

    countries1: string[] = [] ;
    citations_count: number[] = [] ;

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;


    pieData: any; 
    pieOptions: any;
    
    doughnutData: any; 
    doughnutOptions: any;

    barData: any; 
    barOptions: any;
    
    barData1: any; 
    barOptions1: any;


    constructor(private productService: ProductService, public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();

        });
    }

     ngOnInit() {
        this.productService.get_nb_articles().subscribe((res:any)=>{
            this.total_article = res.nb_articles;
            this.total_acm = res.nb_articles_acm            ;
            this.total_ieee = res.nb_articles_ieee;
            this.total_sd = res.nb_articles_science;
        });
        this.productService.get_citations_publisher().subscribe((res:any)=>{
            this.citations_acm = res[0].Citations ;
            this.citations_ieee = res[1].Citations;
            this.citations_sd = res[2].Citations;
        });
        this.productService.get_years().subscribe((result:any)=>{
            
            for (let index = 1; index < result.length; index++) {
                this.years.push(result[index].Year);
                this.years_count.push(result[index].count);
            }
            
        });
        this.productService.get_citations_years().subscribe((result:any)=>{
            
            for (let index = 1; index < result.length; index++) {
                this.citations_count_year.push(result[index].Citations);
            }
            
        });
        this.productService.get_countries_citations().subscribe((result:any)=>{
            this.countries_articles =result;
            for (let index = 0; index < result.length; index++) {
                this.countries.push(result[index].Country);
                this.countries_count.push(result[index].count);
            }
        });
        this.productService.get_citations().subscribe((result:any)=>{
            for (let index = 0; index < result.length; index++) {
                this.countries1.push(result[index].Country);
                this.citations_count.push(result[index].Citations);
            }
        });
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];

        setTimeout(()=> this.initChart(), 2000);
       
    }

    initChart()  {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels:  this.years,
            datasets: [
                {
                    label: 'Articles / année',
                    data:  this.years_count,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                },
                {
                    label: 'Citations / année',
                    data:  this.citations_count_year,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    tension: .4
                },
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        this.doughnutData = {
            labels: ['ACM', 'IEEE', 'Science Direct'],
            datasets: [
                {
                    data: [this.total_acm, this.total_ieee, this.total_sd],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400')
                    ]
                }]
        };

        this.doughnutOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
        this.pieData = {
            labels: ['ACM', 'IEEE', 'Science Direct'],
            datasets: [
                {
                    data: [this.citations_acm, this.citations_ieee, this.citations_sd],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400')
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
        this.barData = {
            labels: this.countries,
            datasets: [
                {
                    label: 'Nombre d\'articles',
                    data: this.countries_count,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                    ]
                }]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
        this.barData1 = {
            labels: this.countries1,
            datasets: [
                {
                    label: 'Nombre de citations',
                    data: this.citations_count,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--purple-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--purple-500'),
                    ]
                }]
        };

        this.barOptions1 = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
