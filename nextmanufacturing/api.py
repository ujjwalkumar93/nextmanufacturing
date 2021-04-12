from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
import json

@frappe.whitelist()
def set_qty(table):
    table = json.loads(table)
    total = 0
    for row in table:
        item_weight_per_unit = frappe.db.get_value("Item", {"item_code": row.get("item_code")},['weight_per_unit'])
        if (item_weight_per_unit and row.get("transfer_qty")):
            weight = item_weight_per_unit * row.get("transfer_qty")
            total += weight
    return total

@frappe.whitelist()
def make_consume_material(doc_name):
    wo_doc = frappe.get_doc('Work Order',doc_name)
    mc = frappe.new_doc("Material Consumption")
    mc.work_order = doc_name
    mc.s_warehouse = wo_doc.wip_warehouse
    mc.company = wo_doc.company
    mc.type = "Manual"
    for res in wo_doc.required_items:
        item_doc = frappe.get_doc("Item",res.item_code)
        mc.append("materials_to_consume", {
            "item_code": res.item_code,
            "item_name": res.item_name,
            "s_warehouse": res.source_warehouse,
            "has_batch_no": item_doc.has_batch_no,
            "uom": item_doc.stock_uom,
            "status": "Not Assigned",
            "qty_to_issue": res.required_qty,
            "weight_per_unit": res.weight_per_unit,
            "type": res.type
        })
    # mc.insert(ignore_permissions=True)
    return mc.as_dict()

        

