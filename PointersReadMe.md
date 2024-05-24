General Ideas and structure pointers:

The usage of the portal will be recorded in two seperate user-files and on local storage:
1- User UserArray: classifying what have been seen (.seen) or send to cart (.buy) by product id.
2- Bank Amount: seperating concerns of money for future transactionnal possibilities.

Fully functionnal logging for returning or new users in 'Auth'and 'Signup'. Have their own page for future .css work.

General ('HomePage') and Detail pages ('ProductPage') for every product available in the backend server at any time.

HomePage fully functional filters and filter-reset. The filters have been coded in the 'store/products/selectors.js' page to correspond with previous KYNA works. It returns a yellow "warning" in the console and I would preferably re-write the filters in the HomePage.js file.

"My purchases" page ('UserCartPage') is a resume of all chosen products with possibility of modifications.

Seperated component pages for rapid modification:
for "send to cart" icons ('CartButtons'), for "info display" on homepage ('ProducBlock'), for popup Menu with login and cart links ('OptionsMenu').
n.b: also a 'clear cache' option to clean localStorage data (came first as a debug function)

Correspondance between "category Id" and intented name found in backend data is harcoded in Categories.js

My excuses for the lack off .css work. My problem is: if I begin there's no end in sight and also, not sure that I am as passionate with visual works. I would prefer to leave it for more visualy talented collegues!
