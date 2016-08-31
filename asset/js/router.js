Vue.config.debug = true
/**
 * Define your components
 */

Vue.transition('custom',{
   enterClass:'lightSpeedIn',
   leaveClass:'lightSpeedOut'
})

// For 404 page
var notFound = Vue.extend({
   // You can use also use template path (Thanks to @jcerdan)
   // path : '/path/to/component.html'
   template: '<h1>Not Found</h1>'
})

// For dashboard. This is our root page
var dashboardComponent = Vue.component('dashboard',{
         template:'#dashboard-template'
})
var bmkgCheck = Vue.component('bmkg',{
      template:'#bmkg-template',
      data:function(){
               return {
                              status:[],
                              cuaca:[],
                              gempa:[],
                              search:''
                     }
      },
      methods:{
               getData:function(){
                  var newItem = this.status;
                    if(newItem == ''){
                        alert('Harus di pilih');
                     }else{
                        Vue.http.get('http://ibacor.com/api/bmkg?view='+newItem).then((response)=>{
                           this.$set('cuaca',response.json().data);
                          },(response)=>{
                                 
                           });
                     }
               }
      }
})
var cssPlayground = Vue.component('cssplay',{
      template:'#cssplay-template',
      data :function(){
               return{
                        setWidth:300,
                        setHeight:180,
                        //text-decoration
                        text:'Koalas CSS Playground',
                        isBold:false,
                        isUnderline:false,
                        isUppercase:false,
                        isLowercase:false,
                        isCapitalize:false,
                        setColor:0000,
                        //font
                        fontSize:30,
                        setColor:'#ffff',
                        isBaloo:false, 
                        isRoboto:false,
                        setFont:[]
               }
      }
})
// Tell Vue to use view-router
Vue.use(VueRouter)

// Router options
var router = new VueRouter({
   history: false,
   root: '/'
})

// Router map for defining components
router.map({
   // For Not Found template
   '*': {
      component: notFound
   },

   '/': {
      component: dashboardComponent,
      
      // Defining Subroutes
     
      },
   '/bmkg':{
         component: bmkgCheck,
   },
   '/cssplay':{
         component: cssPlayground,
   }

   
});

var App = Vue.extend()

router.start(App, '#myApp')
