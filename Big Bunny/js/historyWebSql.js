"use strict";

var websql = {};
websql.db = null;

websql.onError = function(tx, e) {
    logError(e.message);
}

websql.onTxnError = function(e) {
    logError(e.message);
}

websql.onSuccess = function(tx, rs) {
}

websql.init = function() {
    websql.db = openDatabase("history", "1.0", "Big Bunny Ltd", 5 * 1024 * 1024);
    // Initialize database
    websql.db.transaction(function(tx) {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS urls(" +
                "urlid INTEGER PRIMARY KEY ASC" +
                ",url TEXT" +
		",title TEXT" +
                ",host TEXT" +
                ",root_domain TEXT" +
		",parent_id INTEGER" +
		",time INTEGER" +
            ")",
            [],
            websql.onSuccess,
            websql.onError
        );

        tx.executeSql("CREATE UNIQUE INDEX IF NOT EXISTS urls_url ON urls(url)", [], websql.onSuccess, websql.onError);
        tx.executeSql("CREATE INDEX IF NOT EXISTS urls_host ON urls(host)", [], websql.onSuccess, websql.onError);
        tx.executeSql("CREATE INDEX IF NOT EXISTS urls_root_domain ON urls(root_domain)", [], websql.onSuccess, websql.onError);
        tx.executeSql("CREATE INDEX IF NOT EXISTS parent_url_id ON urls(parent_id)", [], websql.onSuccess, websql.onError);
    });
}
