({
		proRec: function (cmp) {
        var columns = [
            {
                type: 'text',
                fieldName: 'ProductName',
                label: 'Product Name',
                initialWidth: 300
            },
            {
                type: 'text',
                fieldName: 'Brand',
                label: 'Brand'
            },
            {
                type: 'currency',
                fieldName: 'price',
                label: 'Price'
            },
            {
                type: 'number',
                fieldName: 'productCode',
                label: 'Product Code'
            }
        ];

        cmp.set('v.gridColumns', columns);
	}
})