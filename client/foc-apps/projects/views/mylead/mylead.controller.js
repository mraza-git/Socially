import '../../projects.module.js';
(function ()
{
    'use strict';

    angular
        .module('app.projects')
        .controller('MyLeadController', MyLeadController);

    /** @ngInject */
    function MyLeadController($document, $state, Product, uiGmapGoogleMapApi, Order)
    {
        var vm = this;

        // Data

        vm.order = Order.data;
        vm.statuses = [
          {
              "id": 1,
              "name": "Awaiting Quotation",
              "color": "md-blue-500-bg"
          },
          {
              "id": 2,
              "name": "Awaiting Customer Response",
              "color": "md-green-500-bg"
          },
          {
              "id": 3,
              "name": "Quoted",
              "color": "md-orange-500-bg"
          },
          {
              "id": 4,
              "name": "Win",
              "color": "md-purple-500-bg"
          },
          {
              "id": 5,
              "name": "Lost",
              "color": "md-green-800-bg"
          },
          {
              "id": 6,
              "name": "Canceled",
              "color": "md-pink-500-bg"
          },
          {
              "id": 7,
              "name": "Job in Progress",
              "color": "md-red-500-bg"
          },
          {
              "id": 8,
              "name": "Completed",
              "color": "md-red-900-bg"
          },
          {
              "id": 9,
              "name": "Awaiting Payment",
              "color": "md-purple-300-bg"
          },
          {
              "id": 10,
              "name": "Payment Recieved",
              "color": "md-blue-500-bg"
          },

        ];
        vm.taToolbar = [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
        ];
        vm.product = Product.data;
        vm.categoriesSelectFilter = '';
        vm.ngFlowOptions = {
            // You can configure the ngFlow from here
            /*target                   : 'api/media/image',
             chunkSize                : 15 * 1024 * 1024,
             maxChunkRetries          : 1,
             simultaneousUploads      : 1,
             testChunks               : false,
             progressCallbacksInterval: 1000*/
        };
        vm.ngFlow = {
            // ng-flow will be injected into here through its directive
            flow: {}
        };
        vm.dropping = false;

        // Methods
        vm.gotoProducts = gotoProducts;
        vm.onCategoriesSelectorOpen = onCategoriesSelectorOpen;
        vm.onCategoriesSelectorClose = onCategoriesSelectorClose;
        vm.fileAdded = fileAdded;
        vm.upload = upload;
        vm.fileSuccess = fileSuccess;
        vm.updateStatus = updateStatus;

        //////////

        init();

        // Normally, you would need Google Maps Geocoding API
        // to convert addresses into latitude and longitude
        // but because Google's policies, we are faking it for
        // the demo
        uiGmapGoogleMapApi.then(function (maps)
        {
            vm.shippingAddressMap = {
                center: {
                    latitude : -34.397,
                    longitude: 150.644
                },
                marker: {
                    id: 'shippingAddress'
                },
                zoom  : 8
            };

            vm.invoiceAddressMap = {
                center: {
                    latitude : -34.397,
                    longitude: 150.644
                },
                marker: {
                    id: 'invoiceAddress'
                },
                zoom  : 8
            };
        });

        /**
         * Initialize
         */
        function init()
        {
            // Select the correct order from the data.
            // This is an unnecessary step for a real world app
            // because normally, you would request the product
            // with its id and you would get only one product.
            // For demo purposes, we are grabbing the entire
            // json file which have more than one product details
            // and then hand picking the requested product from
            // it.
            var id = $state.params.id;

            for ( var i = 0; i < vm.order.length; i++ )
            {
                if ( vm.order[i].id === parseInt(id) )
                {
                    vm.order = vm.order[i];
                    break;
                }
            }
            // END - Select the correct product from the data


            for ( var i = 0; i < vm.product.length; i++ )
            {
                if ( vm.product[i].id === parseInt(id) )
                {
                    vm.product = vm.product[i];
                    break;
                }
            }
            // END - Select the correct product from the data
        }






        /**
         * Go to products page
         */
        function gotoProducts()
        {
            $state.go('app.e-commerce.products');
        }

        /**
         * On categories selector open
         */
        function onCategoriesSelectorOpen()
        {
            // The md-select directive eats keydown events for some quick select
            // logic. Since we have a search input here, we don't need that logic.
            $document.find('md-select-header input[type="search"]').on('keydown', function (e)
            {
                e.stopPropagation();
            });
        }

        /**
         * On categories selector close
         */
        function onCategoriesSelectorClose()
        {
            // Clear the filter
            vm.categoriesSelectFilter = '';

            // Unbind the input event
            $document.find('md-select-header input[type="search"]').unbind('keydown');
        }

        /**
         * File added callback
         * Triggers when files added to the uploader
         *
         * @param file
         */
        function fileAdded(file)
        {
            // Prepare the temp file data for media list
            var uploadingFile = {
                id  : file.uniqueIdentifier,
                file: file,
                type: 'uploading'
            };

            // Append it to the media list
            vm.product.images.unshift(uploadingFile);
        }

        /**
         * Upload
         * Automatically triggers when files added to the uploader
         */
        function upload()
        {
            // Set headers
            vm.ngFlow.flow.opts.headers = {
                'X-Requested-With': 'XMLHttpRequest',
                //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
            };

            vm.ngFlow.flow.upload();
        }

        /**
         * File upload success callback
         * Triggers when single upload completed
         *
         * @param file
         * @param message
         */
        function fileSuccess(file, message)
        {
            // Iterate through the media list, find the one we
            // are added as a temp and replace its data
            // Normally you would parse the message and extract
            // the uploaded file data from it
            angular.forEach(vm.product.images, function (media, index)
            {
                if ( media.id === file.uniqueIdentifier )
                {
                    // Normally you would update the media item
                    // from database but we are cheating here!
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(media.file.file);
                    fileReader.onload = function (event)
                    {
                        media.url = event.target.result;
                    };

                    // Update the image type so the overlay can go away
                    media.type = 'image';
                }
            });
        }

        /**
         * Update order status
         *
         * @param id
         */
        function updateStatus(id)
        {
            if ( !id )
            {
                return;
            }

            for ( var i = 0; i < vm.statuses.length; i++ )
            {
                if ( vm.statuses[i].id === parseInt(id) )
                {
                    vm.order.status.unshift({
                        id   : vm.statuses[i].id,
                        name : vm.statuses[i].name,
                        color: vm.statuses[i].color,
                        date : moment().format('YYYY/MM/DD HH:mm:ss')
                    });

                    break;
                }
            }
        }
    }
})();
