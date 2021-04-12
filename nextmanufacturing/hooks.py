# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "nextmanufacturing"
app_title = "Nextmanufacturing"
app_publisher = "Dexciss Technology Pvt Ltd"
app_description = "Custom App to manage manufacturing"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "info@dexciss.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/nextmanufacturing/css/nextmanufacturing.css"
# app_include_js = "/assets/nextmanufacturing/js/nextmanufacturing.js"

# include js, css files in header of web template
# web_include_css = "/assets/nextmanufacturing/css/nextmanufacturing.css"
# web_include_js = "/assets/nextmanufacturing/js/nextmanufacturing.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "nextmanufacturing/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {
	"Work Order" : "public/js/wo.js",
	"Stock Entry" : "public/js/stock_entry.js",
	"Pick List" : "public/js/pick_list.js",
	}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "nextmanufacturing.install.before_install"
# after_install = "nextmanufacturing.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "nextmanufacturing.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	# "Stock Entry": {
	# 	"on_submit": ["nextmanufacturing.nextmanufacturing.custom_stock_entry.produce_qty",
	# 		"nextmanufacturing.nextmanufacturing.custom_stock_entry.change_work_order_status",
	# 		"nextmanufacturing.nextmanufacturing.custom_stock_entry.set_material_cost"
	# 		],
	# 	"on_cancel": "nextmanufacturing.nextmanufacturing.custom_stock_entry.cancel_produce_qty",
	#},
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"nextmanufacturing.tasks.all"
# 	],
# 	"daily": [
# 		"nextmanufacturing.tasks.daily"
# 	],
# 	"hourly": [
# 		"nextmanufacturing.tasks.hourly"
# 	],
# 	"weekly": [
# 		"nextmanufacturing.tasks.weekly"
# 	]
# 	"monthly": [
# 		"nextmanufacturing.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "nextmanufacturing.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"erpnext.manufacturing.doctype.work_order.work_order.create_pick_list": "nextmanufacturing.nextmanufacturing.doctype.material_consumption.material_consumption.create_pick_list",
# 	#"frappe.desk.doctype.event.event.get_events": "nextmanufacturing.event.get_events"
# 	"erpnext.manufacturing.doctype.pick_list.pick_list.set_item_locations": "nextmanufacturing.nextmanufacturing.doctype.material_consumption.material_consumption.set_item_locations",
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "nextmanufacturing.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]


# User Data Protection
# --------------------

user_data_fields = [
	{
		"doctype": "{doctype_1}",
		"filter_by": "{filter_by}",
		"redact_fields": ["{field_1}", "{field_2}"],
		"partial": 1,
	},
	{
		"doctype": "{doctype_2}",
		"filter_by": "{filter_by}",
		"partial": 1,
	},
	{
		"doctype": "{doctype_3}",
		"strict": False,
	},
	{
		"doctype": "{doctype_4}"
	}
]

