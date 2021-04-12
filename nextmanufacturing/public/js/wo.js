frappe.ui.form.on("Work Order", {
    refresh: function(frm,cdn,cdt){
        set_material_transfer_for_manufacturing(frm)
        frappe.db.get_value("BOM", {"name":frm.doc.bom_no}, 'allow_adding_items', resp => {
            var allowed = false
            if(resp.allow_adding_items ===1){
                allowed = true
                if(frm.doc.status == "In Process" || frm.doc.status == "Not Started" || frm.doc.status == "Draft"){
                    frm.add_custom_button(__('Add Additional Items'),function() {
                        var usr = frappe.session.user
                        frappe.new_doc("Additional Items", {"work_order" : frm.doc.name, "user": usr, 'date': frappe.datetime.now_date(), 'bom': frm.doc.bom_no})
                    })
                }
            }
            if(resp.allow_adding_items ===0){
                var allow_in_line = false
                var table = locals[cdt][cdn].required_items
                table.map(item => {
                    if(item.allowed_to_change_qty_in_wo === 1){
                        allow_in_line = true
                    }
                })
                .then(() => {
                    if(allowed === false && allow_in_line === true){
                        if(frm.doc.status == "In Process" || frm.doc.status == "Not Started" || frm.doc.status == "Draft"){
                            frm.add_custom_button(__('Add Additional Items'),function() {
                                var usr = frappe.session.user
                                frappe.new_doc("Additional Items", {"work_order" : frm.doc.name, "user": usr, 'date': frappe.datetime.now_date(), 'bom': frm.doc.bom_no})
                            })
                        }
                    }
                })
            }
        })


        if(frm.doc.status == "Submitted" || frm.doc.status == "Not Started" || frm.doc.status == "In Process"){
            frm.add_custom_button(__('Consume Material'),function() {
                frappe.call({
                    method: "nextmanufacturing.api.make_consume_material",
                    args: {
                      doc_name: frm.doc.name
                    },
                    callback: function(r){
                        if (r.message) {
                            var doc = frappe.model.sync(r.message)[0];
                            frappe.set_route("Form", doc.doctype, doc.name);
                        }
                    }
                });
            }, __('Functions'))
           

        }

        
    },
    onload: function(frm){
        set_material_transfer_for_manufacturing(frm)
    }
  
})

function set_material_transfer_for_manufacturing(frm){
    frappe.call({
        method: "nextmanufacturing.nextmanufacturing.doctype.additional_items.additional_items.get_se_data",
        args: {
            wo: frm.doc.name
        },
        callback: function(res){
            if(res.message){
                // console.log('res.message is: ', res.message)
                frm.doc.material_transferred_for_manufacturing = res.message
                frm.refresh_field('material_transferred_for_manufacturing')
            }
        }
    })
}