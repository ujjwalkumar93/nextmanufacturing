frappe.ui.form.on("Pick List", {
    // onload: function(frm){
    //     frm.doc.purpose = "Material Transfer"
    //     frm.refresh_field("purpose")
    // },
    // for_qty: function(frm){
    //     frm.doc.purpose = "Material Transfer"
    //     frm.refresh_field("purpose")
    // },
    // get_item_locations: (frm) => {
	// 	// Button on the form
	// 	frm.events.set_item_locations(frm, false);
    //     console.log("r......")
	// },
    material_consumption: (frm) => {
        console.log('mine.....')
        frm.clear_table('locations');
        if(frm.doc.is_material_consumption && frm.doc.consume_work_order){
            frappe.call({

                method: "nextmanufacturing.nextmanufacturing.doctype.material_consumption.material_consumption.consumption_list",
                args: {
                    "wo": frm.doc.consume_work_order
                },
                callback: function(r){
                    if(r.message){
                       r.message.map(i => {
                           //console.log("***** ", i.transferred_qty, i.consumed_qty)
                           //var qty = i.transferred_qty - i.consumed_qty
                        frm.add_child("locations", {
                            "item_code": i.item_code,
                            'qty':  i.qty,
                            "stock_qty": i.qty
                        })
                       })
                    }
                    
                    frm.refresh_field('locations')
                }
            
            
            
            })
        }
            
        // })
        // frappe.call({

        //     method: "nextmanufacturing.nextmanufacturing.doctype.material_consumption.material_consumption.create_pick_list",
        //     args: {
        //         "wo": frm.doc.work_order
        //     },
        //     callback: function(r){
        //         if(r.message){
        //            r.message.map(i => {
        //                //console.log("***** ", i.transferred_qty, i.consumed_qty)
        //                //var qty = i.transferred_qty - i.consumed_qty
        //             frm.add_child("locations", {
        //                 "item_code": i.item_code,
        //                 'qty':  i.qty
        //             })
        //            })
        //         }
                
        //         frm.refresh_field('locations')
        //     }
        // })

        // erpnext.utils.map_current_doc({
        //     method: 'nextmanufacturing.nextmanufacturing.doctype.material_consumption.material_consumption.create_pick_list',
        //     source_doctype: 'Sales Order',
        //     target: frm,
        //     setters: {
        //         company: frm.doc.company,
        //         customer: frm.doc.customer
        //     },
        //     date_field: 'transaction_date',
        //     get_query_filters: get_query_filters
        // });

        // erpnext.utils.map_current_doc({
        //     method: 'nextmanufacturing.nextmanufacturing.doctype.material_consumption.material_consumption.create_pick_list',
        //     target: frm,
        //     source_name: frm.doc.material_consumption
        // });
    },
    // item_locations_add: function(frm){
    //     console.log("item added")
    // }

})