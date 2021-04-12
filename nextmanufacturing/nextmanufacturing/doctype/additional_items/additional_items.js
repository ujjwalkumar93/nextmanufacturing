// Copyright (c) 2021, Dexciss Technology Pvt Ltd and contributors
// For license information, please see license.txt

frappe.ui.form.on('Additional Items', {
	work_order: function(frm){
		//console.log('wo changed')
		frappe.call({
			doc: frm.doc,
			method: 'bom_wise_item',
			callback: function(resp){
				frm.fields_dict['items'].grid.get_field('item').get_query = function(doc, cdt, cdn) {
					var child = locals[cdt][cdn];
					return {    
						filters:[
							['item_code', 'in', resp.message]
						]
					}
				}
			}
		})

        frappe.call({
			doc: frm.doc,
			method: 'get_job_card',
			callback: function(resp){
				if(!resp.exec){
					frm.set_query("job_card", function() {
						return {
							"filters": {
								'name': ['in',resp.message]
							}
						};
					})
				}
			}
		})
		frappe.db.get_value("Work Order", {"name": frm.doc.work_order}, ['bom_no','source_warehouse'], res => {
			if(res){
				frm.doc.bom = res.bom_no
				frm.doc.source_warehouse = res.source_warehouse
				frm.refresh_field('source_warehouse')
				frm.refresh_field('bom')

			}
		})
    },
});

frappe.ui.form.on('Additional Items Detail', {
	item: function(frm,cdt,cdn){
		var table = locals[cdt][cdn]
		if(table.item){
			frappe.call({
				method: "nextmanufacturing.nextmanufacturing.doctype.additional_items.additional_items.get_item_data",
				args: {
					"item": table.item,
					"wo": frm.doc.work_order,
				},
				callback: function(resp){
					if(resp.message){
						//var total_wight = resp.message[0].weight_uom * resp.message[0].weight_per_unit
					table.item_name = resp.message[0].item_name
					table.uom = resp.message[0].weight_uom
					// table.current_stock = resp.message[0].qty
					//table.total_weight = total_wight
					table.weight_per_unit = resp.message[0].weight_per_unit
					}
					frm.refresh_field('items')
				}
			})
		}
	},
	qty: function(frm,cdt,cdn){
		var table = locals[cdt][cdn]
		console.log('child: ', table.weight_per_unit, table.qty)
		var weight = table.weight_per_unit * table.qty
		table.total_weight = weight
		frm.refresh_field('items')
	}
});

