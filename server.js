const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const port = process.env.PORT || 3001;

const { v4: uuidv4 } = require('uuid');
const { Client, Account, Databases, ID, Query, Storage  } = require('appwrite');

const app = express();
let initial_path = path.join(__dirname, "public");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(initial_path));

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65a4565531185e4ce990');

const databases = new Databases(client);
const account = new Account(client);


app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  const promise = account.create(uuidv4(), email, password);

  promise.then(function (response) {
      const userId = response.$id; // Récupérer l'ID utilisateur depuis la réponse

      console.log(response); // Succès
      console.log(userId); // Afficher l'ID utilisateur

      globalSession = { userId }; // Stocker l'ID utilisateur dans la session globale

      res.redirect('/insigths');
  }).catch(function (error) {
      console.log(error); // Échec lors de la création du compte utilisateur
      res.status(500).send('Une erreur est survenue lors de l\'inscription');
  });
});



/*app.get('/seller/product', (req, res) => {
  res.sendFile(path.join(initial_path, "product-page.html"));
});*/

app.get('/avatar', (req, res) => {
  res.sendFile(path.join(initial_path, "avatar.html"));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(initial_path, "signup.html"));
});






function getUserIdFromSession(session) {
  if (session && session.userId) {
    return session.userId;
  }
  return null;
}

/*app.get('/all-product', (req, res) => {
  res.sendFile(path.join(initial_path, "product.html"));
});*/

app.get('/add-product', (req, res) => {
  res.sendFile(path.join(initial_path, "add-product.html"));
});
  



app.get('/product', (req, res) => {
  // Récupérer l'ID utilisateur à partir de la session
  const userId = globalSession.userId;

 const query = [
   Query.equal('UserId', userId)
 ];
 
 const promise = databases.listDocuments(
   '65a5a66e617d96c05249',
   '65a5a6a194395139785e',
   query
 );

 promise
   .then(function (response) {
     console.log(response); // Les documents filtrés sont affichés dans la console

     // Récupérez les documents filtrés et générez le code HTML correspondant
     const documents = response.documents;
     const html = generateHtml(documents);

     // Envoyez le code HTML généré à la vue pour affichage
     res.send(html);
   })
   .catch(function (error) {
     console.log(error);
     res.status(500).send('Une erreur s\'est produite');
   });

   function generateHtml(documents) {
     let html = '';
   
     html += '<html lang="en">';
     html += '<head>';
     // Ajoutez vos métadonnées, liens CSS, etc.
   html += '<meta charset="UTF-8">'; 
   html += '<meta property="title" content="Greed - Product created">'; 
   html += '<meta name="twitter:title" content="Greed - Profile selection">'; 
   html += '<meta name="description" content="Choose or uploadyour profile avatar seller">'; 
   html += '<meta property="og:title" content="Greed - Profile selection">'; 
   html += '<meta property="og:url" content="https://seller.grinfid.com/product">'; 
   html += '<meta name="viewport" content="initial-scale=1, width=device-width">'; 
   html += '<meta name="theme-color" content="#000000">'; 
   html += '<meta name="msapplication-tap-highlight" content="no">'; 
   html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">'; 
   html += '<link rel="shortcut icon" href="/images/grinfid-on-primary.svg" type="image/x-icon">'; 
   html += '<title> Products - Seller </title>'; 
   html += '<link rel="preconnect" href="https://fonts.googleapis.com">'; 
   html += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'; 
   html += '<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">'; 
   html += '<link rel="stylesheet" href="/css/home.css">'; 
   html += '<link rel="stylesheet" href="/css/product.css">'; 
     html += '</head>';
     html += '<body>';
     html += ' <div class="grid-column-app">';
     html += '<div class="grid-column primary-column">';
     // Ajoutez votre en-tête, menu, etc.
     html += '<a href="/" class="logo"><h2 class="brand">Grinfid.</h2></a>';
     html += '<ul class="container-column">';
     html += '<li><a href="/insigths" class="btn btn-primary has-inactive" title="Seller grinfid."><h2 class="mobile-logo-brand hide" style="color: white;">G.</h2><span class="icon has-mobile"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-400q0-100 70-170t170-70h240q100 0 170 70t70 170v400q0 33-23.5 56.5T760-120H200Zm0-80h560v-400q0-66-47-113t-113-47H360q-66 0-113 47t-47 113v400Zm160-280q-33 0-56.5-23.5T280-560q0-33 23.5-56.5T360-640q33 0 56.5 23.5T440-560q0 33-23.5 56.5T360-480Zm240 0q-33 0-56.5-23.5T520-560q0-33 23.5-56.5T600-640q33 0 56.5 23.5T680-560q0 33-23.5 56.5T600-480ZM280-200v-80q0-33 23.5-56.5T360-360h240q33 0 56.5 23.5T680-280v80h-80v-80h-80v80h-80v-80h-80v80h-80Zm-80 0h560-560Z"/></svg></span><span class="menu-text">Seller</span></a></li>';
     html += '<li><a href="/product" class="btn btn-primary has-active"><span class="icon product-icon"><svg xmlns="http://www.w3.org/2000/svg"  height="21" viewBox="0 -960 960 960" width="21"fill="currentColor"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg></span><span class="menu-text">Items</span></a></li>';
     html += '</ul>';
     html += '</div>';
     html += '<div class="grid-column secondary-column">';
     html += '<div class="wrapper-container">';
     html += '<div class="menu-container">';
     html += '<a href="/product" class="btn has-active">Products</a>';
     html += '<a href="/add-product" class="btn has-inactive">Add Item</a>';
     html += '</div>';
     html += '</div>';
     html += '<div class="container-product-created">';
     documents.forEach(function (document) {
       html += '<div class="product">';
       html += '<img src="' + document.image + '" alt="">';
       html += '<span class="name-product-create">' + document.Name.substring(0, 13) + '...</span>';
       html += '<span class="price-product-create">$' + document.Price + '</span>';
       html += '<button class="btn status-product">Delete Product</button>';
       html += '</div>';
     });
   
     html += '</div>';
     html += '</div>';
     html += '</div>';
     html += '</body>';
     html += '</html>';
   
     return html;
   }
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(initial_path, "login.html"));
});



let globalSession = null; // Variable globale pour stocker la session

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  }
});
const upload = multer({ storage: storage });

app.post('/add-product', upload.single('image'), (req, res) => {
 
 

  if (!req.file) {
    return res.status(400).send('Aucun fichier n\'a été uploadé.');
  }

  const promise = databases.createDocument(
    '65a5a66e617d96c05249',
    '65a5a6a194395139785e',
    uuidv4(),
    {
      Name: req.body.name,
      Price: req.body.price,
      Description: req.body.description,
      image: `http://grinfid.netlify.com/uploads/` + req.file.filename,
      
    }
  );

  promise
    .then(function (response) {
      console.log(response);
      res.redirect('/add-product');
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send('Une erreur s\'est produite');
    });
});



app.use('/uploads', express.static('uploads'));





 

app.get('/insights', (req, res) => {
  const userId = globalSession.userId; // Récupérer l'ID utilisateur à partir de la session

  const query = [
      Query.equal('UserId', userId) // Filtrer les documents par l'ID utilisateur
  ];

  const promise = databases.listDocuments(
      '65a5a66e617d96c05249',
      '65a5a6a194395139785e',
      query
  );

  promise.then(function (response) {
      console.log(response); // Les documents filtrés sont affichés dans la console

      // Assignez les documents filtrés à la variable `documents`
      const documents = response;

      // Générez le code HTML correspondant aux documents
      const html = generateHtml(documents);

      // Envoyez le code HTML généré à la vue pour l'affichage
      res.send(html);
  }).catch(function (error) {
      console.log(error);
      res.status(500).send("Une erreur s'est produite");
  });
});


function generateHtml(insights) {
  let html = '';

  html += '<html lang="en">';
  html += '<head>';
  // Ajoutez vos métadonnées, liens CSS, etc.
html += '<meta charset="UTF-8">'; 
html += '<meta property="title" content="Greed - Product created">'; 
html += '<meta name="twitter:title" content="Greed - Profile selection">'; 
html += '<meta name="description" content="Choose or uploadyour profile avatar seller">'; 
html += '<meta property="og:title" content="Greed - Profile selection">'; 
html += '<meta property="og:url" content="https://seller.grinfid.com/product">'; 
html += '<meta name="viewport" content="initial-scale=1, width=device-width">'; 
html += '<meta name="theme-color" content="#000000">'; 
html += '<meta name="msapplication-tap-highlight" content="no">'; 
html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">'; 
html += '<link rel="shortcut icon" href="/images/grinfid-on-primary.svg" type="image/x-icon">'; 
html += '<title> Products - Seller </title>'; 
html += '<link rel="preconnect" href="https://fonts.googleapis.com">'; 
html += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'; 
html += '<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">'; 
html += '<link rel="stylesheet" href="/css/product.css">'; 
html += '<link rel="stylesheet" href="/css/home.css">'; 
  html += '</head>';
  html += '<body>';
  html += ' <div class="grid-column-app">';
  html += '<div class="grid-column primary-column">';
  // Ajoutez votre en-tête, menu, etc.
  html += '<a href="/" class="logo"><h2 class="brand">Grinfid.</h2></a>';
  html += '<ul class="container-column">';
  html += '<li><a href="/insigths" class="btn btn-primary has-active" title="Seller grinfid."><h2 class="mobile-logo-brand hide" style="color: white;">G.</h2><span class="icon has-mobile"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-400q0-100 70-170t170-70h240q100 0 170 70t70 170v400q0 33-23.5 56.5T760-120H200Zm0-80h560v-400q0-66-47-113t-113-47H360q-66 0-113 47t-47 113v400Zm160-280q-33 0-56.5-23.5T280-560q0-33 23.5-56.5T360-640q33 0 56.5 23.5T440-560q0 33-23.5 56.5T360-480Zm240 0q-33 0-56.5-23.5T520-560q0-33 23.5-56.5T600-640q33 0 56.5 23.5T680-560q0 33-23.5 56.5T600-480ZM280-200v-80q0-33 23.5-56.5T360-360h240q33 0 56.5 23.5T680-280v80h-80v-80h-80v80h-80v-80h-80v80h-80Zm-80 0h560-560Z"/></svg></span><span class="menu-text">Seller</span></a></li>';
  html += '<li><a href="/product" class="btn btn-primary has-inactive"><span class="icon"><svg xmlns="http://www.w3.org/2000/svg"  height="20" viewBox="0 -960 960 960" width="20"fill="currentColor"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg></span><span class="menu-text">Items</span></a></li>';
  html += '</ul>';
  html += '</div>';
  html += '<div class="grid-column secondary-column">';
  html += '<div class="wrapper-container">';
  html += '<div class="menu-container">';
  html += '<a href="/" class="btn has-active">Insights</a>';
  html += '<a href="/order" class="btn has-inactive">Orders</a>';
  html += '</div>';
  html += '</div>';
  html += '<div class="product-overview-container">';
  insights.documents.forEach(function (insigth) {
    html += '<div class="product-overview">';
    html += '<img src="' + insigth.image + '" alt="">';
    html += '<button class="status-product btn">Status Placed</button>';
    html += '<div class="impression-container"><div class="title"><span>Impression</span></div><div class="span-impression"><span>300</span></div></div>';
    html += ' <div class="impression-container"><div class="title"><span>Purchasing<strong class="status-product realtime-data-text">realtime</strong></span></div><div class="span-purchasing"><span>$450.00</span></div></div>';
    html += '<div class="impression-container"><div class="title"><span>Orders</span></div><div class="span-order"><span>18</span></div></div>';
    html += '</div>';
  });
  

  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '</body>';
  html += '</html>';

  return html;
}
   
;



app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const promise = account.createEmailSession(email, password);

  promise.then(function (response) {
    globalSession = response; // Stockez la session dans la variable globale

    const userId = response.userId; // Récupérer l'ID utilisateur à partir de la session

    console.log(globalSession); // Session créée avec succès
    console.log(userId); // Afficher l'ID utilisateur

    res.redirect('/insigths'); // Rediriger vers la page racine
  }, function (error) {
    console.log(error); // Erreur lors de l'authentification
    res.send('Erreur lors de l\'authentification');
  });
});





app.get('/order', (req, res) => {
  // Récupérer l'ID utilisateur à partir de la session
  const userId = globalSession.userId;

 const query = [
   Query.equal('UserId', userId)
 ];
 
 const promise = databases.listDocuments(
   '65a5a66e617d96c05249',
   '65b6f655bfb49e652506',
   query
 );

 promise
 .then(function (response) {
  console.log(response); // Les documents filtrés sont affichés dans la console

  // Assignez les documents filtrés à la variable `documents`
  const documents = response;

  // Générez le code HTML correspondant aux documents
  const html = generateHtml(documents);

  // Envoyez le code HTML généré à la vue pour l'affichage
  res.send(html);
})
.catch(function (error) {
  console.log(error);
  res.status(500).send("Une erreur s'est produite");
});

   function generateHtml(orders) {
    let html = '';
    
    
    html += '<html lang="en">';
    html += '<head>';
    // Ajoutez vos métadonnées, liens CSS, etc.
    html += '<meta charset="UTF-8">';
    html += '<meta property="title" content="Greed - Product created">';
    html += '<meta name="twitter:title" content="Greed - Profile selection">';
    html += '<meta name="description" content="Choose or uploadyour profile avatar seller">';
    html += '<meta property="og:title" content="Greed - Profile selection">';
    html += '<meta property="og:url" content="https://seller.grinfid.com/product">';
    html += '<meta name="viewport" content="initial-scale=1, width=device-width">';
    html += '<meta name="theme-color" content="#000000">';
    html += '<meta name="msapplication-tap-highlight" content="no">';
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<link rel="shortcut icon" href="/images/grinfid-on-primary.svg" type="image/x-icon">';
    html += '<title> Products - Seller </title>';
    html += '<link rel="preconnect" href="https://fonts.googleapis.com">';
    html += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
    html += '<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">';
    html += '<link rel="stylesheet" href="/css/order.css">';
    html += '<link rel="stylesheet" href="/css/product.css">';
    html += '<link rel="stylesheet" href="/css/home.css">';
    html += '</head>';
    html += '<body>';
    html += ' <div class="grid-column-app">';
    html += '<div class="grid-column primary-column">';
    // Ajoutez votre en-tête, menu, etc.
    html += '<a href="/" class="logo"><h2 class="brand">Grinfid.</h2></a>';
    html += '<ul class="container-column">';
    html += '<li><a href="/insigths" class="btn btn-primary has-active" title="Seller grinfid."><h2 class="mobile-logo-brand hide" style="color: white;">G.</h2><span class="icon has-mobile"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-400q0-100 70-170t170-70h240q100 0 170 70t70 170v400q0 33-23.5 56.5T760-120H200Zm0-80h560v-400q0-66-47-113t-113-47H360q-66 0-113 47t-47 113v400Zm160-280q-33 0-56.5-23.5T280-560q0-33 23.5-56.5T360-640q33 0 56.5 23.5T440-560q0 33-23.5 56.5T360-480Zm240 0q-33 0-56.5-23.5T520-560q0-33 23.5-56.5T600-640q33 0 56.5 23.5T680-560q0 33-23.5 56.5T600-480ZM280-200v-80q0-33 23.5-56.5T360-360h240q33 0 56.5 23.5T680-280v80h-80v-80h-80v80h-80v-80h-80v80h-80Zm-80 0h560-560Z"/></svg></span><span class="menu-text">Seller</span></a></li>';
    html += '<li><a href="/product" class="btn btn-primary has-inactive"><span class="icon"><svg xmlns="http://www.w3.org/2000/svg"  height="20" viewBox="0 -960 960 960" width="20"fill="currentColor"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg></span><span class="menu-text">Items</span></a></li>';
    html += '</ul>';
    html += '</div>';
    html += '<div class="grid-column secondary-column">';
    html += '<div class="wrapper-container">';
    html += '<div class="menu-container">';
    html += '<a href="/" class="btn has-inactive">Insights</a>';
    html += '<a href="/order" class="btn has-active">Orders</a>';
    html += '</div>';
    html += '</div>';
    html += '<div class="order-container-overview">';
    
    orders.documents.forEach(function (order) {
      // Utilisez `order` au lieu de `document` pour accéder aux propriétés du document
      html += '<div class="order-overview">';
      html += '<div class="top-order-container">';
      html += '<div class="product-image-list">';
      html += '<img src="' + order.image + '" alt="">';
      html += '</div>';
      html += '<button class="btn status-product fs-min delete-order" title="Delete the order">Delete</button>';
      html += '</div>';
    
      html += '<div class="box-details">';
      html += '<div class="order-information-list"><div class="information-order"><span class="name-information fs-min">Address</span><span class="data-information fs-min-x">' + order.adress.substring(0, 60)  + '</span></div></div>';
      html += '<div class="order-information-list"><div class="information-order"><span class="name-information fs-min">Product Shipped</span><span class="data-information fs-min-x">12, Jul 2023 at 12h04</span></div></div>';
      html += '<div class="order-information-list"><div class="information-order"><span class="name-information fs-min">Customer</span><span class="data-information fs-min-x">' + order.customer + '</span></div></div>';
      html += '<div class="order-information-list"><div class="information-order"><span class="name-information fs-min">ZipCode</span><span class="data-information fs-min-x">' + order.code + '</span></div></div>';
      html += '<div class="order-information-list"><div class="information-order"><span class="name-information fs-min">Country</span><span class="data-information fs-min-x">' + order.country + '</span></div></div>';
      html += '<div class="order-information-list"><div class="information-order"><span class="name-information fs-min">Phone</span><span class="data-information fs-min-x">' + order.phone + '</span></div></div>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</body>';
    html += '</html>';
    
    return html;
    }
});






app.get('/seller', (req, res) => {
  const userId = globalSession.userId; // Récupérer l'ID utilisateur à partir de la session

  const query = [
    Query.equal('UserId', userId) // Filtrer les documents par l'ID utilisateur
  ];

  const promise = databases.listDocuments(
    '65a5a66e617d96c05249',
    '65a5a6a194395139785e',
    query
  );

  promise
    .then(function (response) {
      console.log(response); // Les documents filtrés sont affichés dans la console

      // Récupérez les documents filtrés et générez le code HTML correspondant
      const documents = response.documents;
      const html = generateHtml(documents);

      // Envoyez le code HTML généré à la vue pour affichage
      res.send(html);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send('Une erreur s\'est produite');
    });

    function generateHtml(sellers) {
      let html = '';
    
      html += '<html lang="en">';
      html += '<head>';
      // Ajoutez vos métadonnées, liens CSS, etc.
    html += '<meta charset="UTF-8">'; 
    html += '<meta property="title" content="Greed - Product created">'; 
    html += '<meta name="twitter:title" content="Greed - Profile selection">'; 
    html += '<meta name="description" content="Choose or uploadyour profile avatar seller">'; 
    html += '<meta property="og:title" content="Greed - Profile selection">'; 
    html += '<meta property="og:url" content="https://seller.grinfid.com/product">'; 
    html += '<meta name="viewport" content="initial-scale=1, width=device-width">'; 
    html += '<meta name="theme-color" content="#000000">'; 
    html += '<meta name="msapplication-tap-highlight" content="no">'; 
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">'; 
    html += '<link rel="shortcut icon" href="/images/grinfid-on-primary.svg" type="image/x-icon">'; 
    html += '<title> Products - Seller </title>'; 
    html += '<link rel="preconnect" href="https://fonts.googleapis.com">'; 
    html += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'; 
    html += '<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">'; 
    html += '<link rel="stylesheet" href="/css/seller.css">'; 
    html += '<link rel="stylesheet" href="/css/home.css">'; 
      html += '</head>';
      html += '<body>';
      html += '<div class="seller-container-page">';
      html += '<div class="top-container-seller-page">';
      html += '<div class="profile-picture"><img src="/avatar/toy.jpg"  style="border-radius: 50%; object-fit: cover;" alt=""></div>';
      html += '<span class="name-seller">Kickzs.</span>';
      html += '</div>';
      html += '<div class="seller-container-page">';
      html += '<div class="product-seller-container">';
    
      sellers.forEach(function (seller) {
        const sellerId = seller["$id"];
        html += '<a href="/seller/item?id=' + encodeURIComponent(sellerId) + '">';
        html += '<div class="product-seller">';
        html += '<img src="' + seller.image + '" alt="">';
        html += '<span class="name-product-seller">' + seller.Name.substring(0, 20) + '...</span>';
        html += '<span class="price-product-seller">$' + seller.Price + '</span>';
        html += '</div>';
        html += '</a>';
      });
    
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</body>';
      html += '</html>';
    
      return html;
    }
});




app.get('/seller/item', (req, res) => {
  const productId = req.query.id; // Récupérer l'ID du produit à partir de la requête

  const query = [
    Query.equal('$id', productId) // Filtrer les documents par l'ID du produit
  ];

  const promise = databases.listDocuments(
    '65a5a66e617d96c05249',
    '65a5a6a194395139785e',
    query
  );

  promise
    .then(function (response) {
      console.log(response); // Le document correspondant est affiché dans la console

      // Vérifiez si un document correspondant a été trouvé
      if (response.documents.length === 0) {
        res.status(404).send('Produit non trouvé');
        return;
      }

      // Récupérez le document correspondant
      const document = response.documents[0];
      const image = document.image;
      const name = document.Name;
      const description = document.Description;
      const price = document.Price;

      // Générez le code HTML correspondant avec les informations récupérées
      const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta property="title" content="Greed - Profile selection">
            <meta name="twitter:title" content="Greed - Profile selection">
            <meta name="description" content="Choose or upload your profile avatar seller">
            <meta property="og:title" content="Greed - Profile selection">
            <meta property="og:url" content="https://seller.greed.com/seller-avatar">
            <meta name="viewport" content="initial-scale=1, width=device-width">
            <meta name="theme-color" content="#000000">
            <meta name="msapplication-tap-highlight" content="no">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="shortcut icon" href="/images/grinfid-on-primary.svg" type="image/x-icon">
            <title>Grinfid - Seller </title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="/css/home.css">
            <link rel="stylesheet" href="/css/product-page.css">
        </head>
        <body>
            <div class="container-product">
                <div class="avatar-box">
                    <img src="/avatar/toy.jpg" style="border-radius: 50%;" alt="">
                    <span class="seller-name">Kickzs.</span>
                </div>
                <img src="${image}" alt="Product Image">
                <button class="btn  has-active">Pay. <span  class="status-product price-product-selling">$${price}</span></button>
                <div class="container-product-details">
                    <p class="product-selling-name">${name}</p>
                    <p class="description">
                        ${description}
                    </p>
                    <div class="bottom-text">
                        <p>Powered by <a href="">Grinfid.</a></p>
                    </div>
                </div>
            </div>
        </body>
        </html>`;

      // Envoyez le code HTML généré à la vue pour affichage
      res.send(html);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send('Une erreur s\'est produite');
    });
});

app.get('/seller', (req, res) => {
  res.sendFile(path.join(initial_path, "seller.html"));
});

app.get('/place-order', (req, res) => {
  res.sendFile(path.join(initial_path, "place-order.html"));
});

/*app.get('/', (req, res) => {
  res.sendFile(path.join(initial_path, "home.html"));
});*/

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const promise = account.createEmailSession(email, password);

  promise
    .then(function (response) {
      console.log(response); // Succès
      res.redirect('/insigths'); // Rediriger vers la page principale après l'authentification réussie
    })
    .catch(function (error) {
      console.log(error); // Échec
      res.status(500).send('Une erreur s\'est produite');
    });
});




app.post('/place-order', (req, res) => {
  const userId = globalSession.userId; 

  const promise = databases.createDocument(
    '65a5a66e617d96c05249',
    '65b6f655bfb49e652506',
    uuidv4(),
    {
      adress: req.body.adress,
      town: req.body.town,
      country: req.body.country,
      code: req.body.code,
      phone: req.body.phone,
      customer: req.body.customer,
      image: 'https://grinfid.onrender.com/uploads/1706142573412-536402254.jpeg',
      UserId: userId,
    }
  );

  promise
    .then(function (response) {
      console.log(response);
      res.redirect('/product');
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send('Une erreur s\'est produite');
    });
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
