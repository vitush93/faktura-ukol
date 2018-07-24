import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Invoice } from 'react-simple-invoice';
import axios from 'axios';
import html2pdf from 'html2pdf.js';


const ARES_API = 'https://s5koih2p97.execute-api.eu-west-1.amazonaws.com/latest'


function fetchIco(ico) {
    return axios.get(ARES_API, {
        params: {ico}
    });
}


export default (odberatel, dodavatel, cena) => {
    const invoice = {
        createdDate: '2018-03-16',
        dueDate: '2018-04-16',
        paymentMethod: '',
        id: 'ABCD-1234',
        description: 'Post-show cravings',
        items: [
            {
                description: 'Uklidove sluzby',
                amount: Number(cena),
            }
        ],
    };
    

    fetchIco(odberatel).then(res => {
        const cust_addr = res.data.address;

        const customer = {
            name: '',
            email: '',
            address: [
                cust_addr,
            ],
            // logoUrl: 'http://p.fod4.com/p/media/c9c34f4e09/JqdTM3oTiqTcrbFoLdxb_Hamilton_200x200.jpg',
        };

        fetchIco(dodavatel).then(res => {
            const comp_addr = res.data.address;

            const company = {
                name: '',
                address: [
                    comp_addr
                ],
                email: '',
                // logoUrl: 'https://www.shakeshack.com/wp-content/themes/shakeshack/images/shakeshack_logo.png',
            };

            const html = renderToStaticMarkup(
                <Invoice
                    invoice={invoice}
                    customer={customer}
                    company={company}
                />
            );
        
            html2pdf(html);
        })
    });
    
    
   
    
    
}