var express = require('express');
var router = express.Router();
var book_dao=require("../dao/books_dao").booksDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/upload/";
var fs=require("fs");


router.post('/allbooks',function(request, response, next) {

        book_dao.getAllBooks(function (result) {
            if(result=="e004"){
                response.json({"statusCode":result});
            }else if(result){
                    // response.json({"statusCode":12});
                    response.json(result);

                }else {
                    response.json({"statusCode":13});
                }
        })
    });
        //============上面是获取全部图书全部信息

router.post('/mostcombooks', function(request, response, next) {

    book_dao.getMostComBooks(function (result) {
        if (result == "e004") {
            response.json({"statusCode": result});
        } else {
            if (result){
                // response.json({"statusCode": 14});
                response.json(result);
                console.log(JSON.stringify(result))
            }
            else {response.json({"statusCode": 15});}
        }
        });
});
//=======================上面是根据评论数获取推荐的书

router.post('/bookdetail', function(request, response, next) {
    var book=request.body;
    console.log(book);
    if(book){
    book_dao.getBookDetail(book.book_id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result.length == 0) {
                //说明获取详情页失败
                response.json({"statusCode":17});
            } else {
                //获取成功
                // response.json({"statusCode":16});
                response.json(result);
                console.log(JSON.stringify(result));
            }
        }
    });
    }
    else {
        response.json({"statusCode":18});
        console.log("获取书详情的书id不存在！")
    }
});
//==============================上面是获取某一个书的详情

router.post('/classbookbytag', function(request, response, next) {
    var book=request.body;
    // console.log(book);
    if(book){
        book_dao.classBookByTag(book.book_tag,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.length == 0) {
                    //说明该标签下没有书
                    response.json({"statusCode":20});
                } else {
                    //获取成功
                    // response.json({"statusCode":19});
                    response.json(result);
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":21});
        console.log("该book_tag不存在！")
    }
});
//==========================通过标签分类书籍

// router.post('/insertbook', function(request, response, next) {
//
//     book_dao.classBookByTag(book.book_tag, function (result) {
//         if (result == "e004") {
//             response.json({"statusCode": result});
//         }
//         else {
//             if (result.length == 0) {
//                 //说明该标签下没有书
//                 response.json({"statusCode": 20});
//             } else {
//                 //获取成功
//                 response.json({"statusCode": 19});
//                 console.log(JSON.stringify(result));
//             }
//         }
//     });
// });
//========================插入图书(admin),需要先检查书名是否重复



//================================显示书的love数并递减排序

router.post('/showlove', function(request, response, next) {
    var book=request.body;
    // console.log(book);
    if(book){
        book_dao.showlove(book.user_id,book.book_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                console.log(result.length);
                console.log(JSON.stringify(result));

                if (result.length == 0) {
                    //说明没找到love_id
                    response.json({"statusCode":39});
                } else {
                    //获取成功
                    response.json({"statusCode":38});
                    // response.json(result);
                    // console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":40});
        console.log("user_id,book_id不存在！")
    }
});
//====================================显示用户是否喜欢该书

router.post('/showlove/insertlove', function(request, response, next) {
    var book=request.body;
    var rr;
    // console.log(book);
    if(book){
        book_dao.insertlove(book.user_id,book.book_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {

                if (result.affectedRows==1) {
                    //说明插入成功
                    response.json({"statusCode":41});
                } else {
                    //插入失败
                    response.json({"statusCode":42});
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":40});
        console.log("user_id,book_id不存在！")
    }
});
//====================================用户点击喜欢该书

router.post('/showlove/deletelove', function(request, response, next) {
    var book=request.body;
    // console.log(book);
    if(book){
        book_dao.deletelove(book.user_id,book.book_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.affectedRows==1) {
                    //说明删除成功
                    response.json({"statusCode":43});
                } else {
                    //删除失败
                    response.json({"statusCode":44});
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":40});
        console.log("user_id,book_id不存在！")
    }
});
//====================================用户点击不喜欢该书

router.post('/searchbook', function(request, response, next) {
    var book=request.body;
    // console.log(book);
    if(book){
        book_dao.searchBook(book.searchCon,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result[0].length==0) {
                    //说明搜索没有结果
                    response.json({"statusCode":88});
                } else {
                    //删除失败
                    response.json(result);
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":89});
        console.log("未输入搜索内容")
    }
});
//=================================================搜索书籍


module.exports = router;
