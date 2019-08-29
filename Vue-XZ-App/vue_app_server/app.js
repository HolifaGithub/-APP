const express=require('express');
const pool=require('./pool.js');
const cors=require('cors');
const bodyParser=require('body-parser');
const session = require("express-session");
var app=express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({
	extended:false
}))
app.use(cors({
	origin:['http://127.0.0.1:3001','http://localhost:3001'],
	credentials:true
}))
app.use(session({
  secret:'随机字符串',
  cookie:{maxAge:60*1000*30},//过期时间ms
  resave:false,
  saveUninitialized:true
}))
app.listen(3000);
app.get('/imageList',(req,res)=>{
	var obj=[{
		id:1,
		imgUrl:'http://127.0.0.1:3000/img/banner1.png'
	},
	{
		id:2,
		imgUrl:'http://127.0.0.1:3000/img/banner2.png'
	},
	{
		id:3,
		imgUrl:'http://127.0.0.1:3000/img/banner3.png'
	},
	{
		id:4,
		imgUrl:'http://127.0.0.1:3000/img/banner4.png'
	}];
	res.send(obj);
})

//获取新闻列表
app.get('/newslist',(req,res)=>{
	 var obj={};
     var progress=0;
	 var pno=req.query.pno;
	 var pageSize=parseInt(req.query.pageSize);
	 var sql='SELECT count(id) as c FROM xz_news';
	 pool.query(sql,[],(err,result)=>{
	 	if(err) throw err;
	 	var c=Math.ceil(parseInt(result[0].c)/pageSize);
	 	obj.pageCount=c;
	 	progress +=50;
	 	if(progress===100){
	 		res.send(obj);
	 	}
	 })
	 
//	 查找分页内容
	 var sql="SELECT id,title,img_url,ctime,point FROM xz_news LIMIT ?,?";
	 var offset=parseInt((pno-1)*pageSize);
	 pool.query(sql,[offset,pageSize],(err,result)=>{
	 	if(err) throw err;
	 	obj.data=result;
	 	progress+=50;
	 	if(progress===100){
	 		res.send(obj);
	 	}
	 })
})

//发送新闻详细信息
app.get('/newsinfo',(req,res)=>{
	var obj={
		title:'广州房价下降，白菜价',
		content:"今天广州房价下降了0.35%"
	}
	res.send(obj);
})

//用户发表评论
app.post('/postcomment',(req,res)=>{
        var nid=req.body.nid;
        var msg=req.body.msg;
		var sql='INSERT INTO xz_comment(content,user_name,ctime,nid) VALUES (?,"匿名",now(),?)';
		pool.query(sql,[msg,nid],(err,result)=>{
			if(err) throw err;
			res.send({code:1,msg:"发表评论成功！"});
		})
})

//用户获取指定新闻编号下的评论
app.get('/getcomment',(req,res)=>{
	 var nid=parseInt(req.query.nid);
	 var obj={};
     var progress=0;
	 var pno=req.query.pno;
	 var pageSize=parseInt(req.query.pageSize);
	 var sql='SELECT count(id) as c FROM xz_comment WHERE nid=?';
	 pool.query(sql,[nid],(err,result)=>{
	 	if(err) throw err;
	 	var c=Math.ceil(parseInt(result[0].c)/pageSize);
	 	obj.commentCount=parseInt(result[0].c);
	 	obj.pageCount=c;
	 	progress +=50;
	 	if(progress===100){
	 		res.send(obj);
	 	}
	 })
	 
//	 查找分页内容
	 var sql="SELECT id,content,ctime,user_name FROM xz_comment WHERE nid= ? ORDER BY id DESC LIMIT ?,?";
	 var offset=parseInt((pno-1)*pageSize);
	 pool.query(sql,[nid,offset,pageSize],(err,result)=>{
	 	if(err) throw err;
	 	obj.data=result;
	 	progress+=50;
	 	if(progress===100){
	 		res.send(obj);
	 	}
	 })
})

//获取商品列表
app.get('/getproductlist',(req,res)=>{
	var sql="SELECT lid,title,prev_price,price,sold_count,remain_count,(SELECT md FROM xz_laptop_pic WHERE laptop_id=lid LIMIT 1) AS md FROM xz_laptop";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})
//商品详情页根据商品编号查找轮播图
app.get('/getproductdetail',(req,res)=>{
	var lid=req.query.lid;
	var obj={};
	var progress=0;
	var sql="SELECT md FROM xz_laptop_pic WHERE laptop_id=?";
	pool.query(sql,[lid],(err,result)=>{
		if(err) throw err;
		progress+=50;
		obj.pics=result;
		if(progress===100){
		   res.send(obj);
		}
	})
	
	var sql="SELECT * FROM `xz_laptop` WHERE lid=?";
	pool.query(sql,[lid],(err,result)=>{
		if(err) throw err;
		progress+=50;
		obj.info=result[0];
		if(progress===100){
			res.send(obj);
		}
	})
})

//用户登录
app.post("/signin",(req,res)=>{
  var uname=req.body.uname;
  var upwd=req.body.upwd;
  var sql="select * from xz_user where uname=? and upwd=?";
  pool.query(sql,[uname,upwd],(err,result)=>{
    err&&console.log(err);
    if(result.length>0){
      req.session.uid=result[0].uid;
      res.write(JSON.stringify({ok:1}));
    }else{
      res.write(JSON.stringify({ok:0,msg:"用户名或密码错误!"}));
    }
    res.end();
  })
})
app.get("/islogin",(req,res)=>{
  var uid=req.session.uid
  if(uid==undefined){
    res.write(JSON.stringify({ok:0}));
    res.end();
  }else{
    var sql="select * from xz_user where uid=?";
    pool.query(sql,[uid],(err,result)=>{
      res.write(JSON.stringify({ok:1,uname:result[0].uname}));
      res.end();
    })
  }
})
app.get("/signout",(req,res)=>{
  delete req.session.uid;
  res.send();
})

//获取购物车信息
app.get("/getshopcart",(req,res)=>{
  var sql=
  `select *,(
    select md from xz_laptop_pic 
    where laptop_id=lid 
    limit 1
   ) as md 
   from xz_shoppingcart_item 
     inner join xz_laptop on product_id=lid 
   where user_id=? 
   order by iid desc`;
  var uid=req.session.uid;
  pool.query(sql,[uid],(err,result)=>{
    res.send(result);
  })
})

//添加购物车
app.get("/addcart",(req,res)=>{
   var lid=req.query.lid;
  var count=req.query.count;
  var uid=req.session.uid;
  var sql="select * from xz_shoppingcart_item where user_id=? and product_id=?";
  pool.query(sql,[uid,lid],(err,result)=>{
  	if(err) throw err;
  	  if(result.length==0){
      var sql="insert into xz_shoppingcart_item values(null,?,?,?,0)";
      pool.query(sql,[uid,lid,count],(err,result)=>{
        res.send({ok:1});
      })
    }else{
      var sql="update xz_shoppingcart_item set count=count+? where user_id=? and product_id=?";
      pool.query(sql,[count,uid,lid],(err,result)=>{
        res.send({ok:1});
      })
    }
  })

})

//更新购物车
app.get("/updatecart",(req,res)=>{
  var iid=req.query.iid;
  var count=req.query.count;
  if(count>0){
    var sql="update xz_shoppingcart_item set count=? where iid=?";
    pool.query(sql,[count,iid],(err,result)=>{
      res.send({ok:1});
    })
  }else{
    var sql="delete from xz_shoppingcart_item where iid=?";
    pool.query(sql,[iid],(err,result)=>{
      res.send({ok:1});
    })
  }
})

//添加订单详情
app.get('/orderdetail',(req,res)=>{
	var did=req.session.uid;
	var count=req.query.count;
	var product_id=req.query.iid;
	var order_id=req.query.oid;
	var sql='INSERT INTO xz_order_detail(did,order_id,product_id,count) VALUES (?,?,?,?)';
	pool.query(sql,[did,order_id,product_id,count],(err,result)=>{
		if(err) throw err;
		if(result.affectRows>=1){
			res.send({ok:1});
		}
		else{
			res.send({ok:0});
		}
	})
})

//查找获取商品列表
app.get("/search",(req,res)=>{
  var output={
    count:0,
    pageSize:8,
    pageCount:0,
    pno:req.query.pno,
    data:[]
  };
  var kw=req.query.kw;
  console.log(kw);
  //"mac i5 128g"
  var kws=kw.split(" ");
  //[mac,i5,128g]
  kws.forEach((elem,i,arr)=>{
    arr[i]=`title like '%${elem}%'`;
  })
  /*[
    title like '%mac%',
    title like '%i5%',
    title like '%128g%'
  ]*/
  //join(" and ");
  var where=kws.join(" and ");
  //"title like '%mac%' and title like '%i5%' and title like '%128g%'"
  var sql=`select *,(select md from xz_laptop_pic where laptop_id=lid limit 1) as md from xz_laptop where ${where}`;
  new Promise(function(resolve){
  pool.query(sql,[],(err,result)=>{
  	if(err) throw err;
    output.count=result.length;
    output.pageCount=
      Math.ceil(output.count/output.pageSize);
    sql+=` limit ?,?`;
    resolve();

  	})
  }).then(function(){
  	pool.query(sql,[output.pageSize*output.pno,output.pageSize],(err,result)=>{
  	    output.data=result;
        res.send(output);	
  	})
  })
  })
