exports.sql={
    //查看话题全部信息,按关注人数排序
    getAllTopicsByAttent:"call getAllTopicsByAttent",
    //查看话题全部信息,按文章数排序
    getAllTopicsByArticle:"call getAllTopicsByArticle",
    //根据topic_id获取该话题信息
    getTopicById:"call getTopicByTopicId(?,@result)",
    //在某一话题中获取推荐文章(按评论数排序),参数是topic_id
    getMostComArticleByTopic:"call getMostComArticleByTopic(?,@result)",
    //在某一话题中获取收藏文章(按收藏数排序),参数是topic_id
    getMostCollectArticleByTopic:"call getMostCollectArticleByTopic(?,@result)",
    //在某一话题中获取最新文章(按发布时间排序),参数是topic_id
    getNewestArticleByTopic:"call getNewestArticleByTopic(?,@result)",
    //显示用户已关注的所有topic_id
    showallattent:"select topic_id from attenttable where user_id=?",
    //(显示关注)利用user_id,topic_id遍历attent表,如果表中有attent_id，则表示该话题被该用户关注,否则没有
    showattent:"select attent_id from attenttable where user_id=? and topic_id=?",
    //如果attent表中没有,则用户点击'关注',向attent表中插入(载入页面就已经执行showattent确认了,是否需要再次确认?)
    insertattent:"insert into attenttable(user_id,topic_id,attent_time) VALUES (?,?,now())",
    //如果attent表中有,则用户点击'喜欢',从love表中删除(载入页面就已经执行showlove确认了,是否需要再次确认?)
    deleteattent:"delete from attenttable where user_id=? and topic_id=?",
    //新增话题(admin)
    //insertTopic:"",
    //简单获取所有话题
    getAllTopics:"select topic_id,topic_name from topictable",
    //通过topic_name获取topic_id
    getTopicIdByname:"select topic_id from topictable where topic_name=?",

    searchTopic:"call searchTopic(?,@result)",

};