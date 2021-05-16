/* global XMLHttpRequest, history */
/**
 * SimpleSearchJS
 *
 *  - JavaScript module for querying the Simple Search Service and generating
 *  HTML fragments from the JSON response.
 *
 * example (dynamically):
 *
 *   <input type="text"
 *       data-simple-search="http://a-simple-search-service-url.com"
 *       data-search-table=".results-table-container"
 *       data-search-facets="#resultfacets">
 *
 * where the optional values of data-search-table and data-search-facets are selectors
 * to the DOM elements where the results table and facets list are to be inserted
 *
 * example (programmatically):
 *
 *   var searchUtil = SimpleSearch('http://a-simple-search-service-url.com', callbackFuncs, selectors)
 *
 * the 'callbackFuncs' passed should be an object containing the callback functions to call
 * after a request has completed. three callback functions can be defined- onFail if the
 * request failed, onSucess if the request was successful, onBefore which is called before
 * search request begins:
 *
 *   callbackFuncs = {
 *     onFail: function (error) { ... },
 *     onSuccess: function (results) { ... },
 *     onBefore: function () { ... }
 *   }
 *
 * a search is made automatically when ENTER key is pressed on the input field.
 * in addition, the search can also be performed programmatically
 *
 *   searchUtil.search('*:*') // search using passed query and default limit
 *   searchUtil.search('*:*', 10) // search using passed query and specified limit
 *
 * the results table includes next/previous paging elements. however, paging can also
 * be programmatically called:
 *
 *   searchUtil.next()
 *   searchUtil.prev()
 *
 */


//function readTextFile(file, callback) {
//  var rawFile = new XMLHttpRequest();
//  rawFile.overrideMimeType("application/json");
//  rawFile.open("GET", file, true);
//  rawFile.onreadystatechange = function () {
//    if (rawFile.readyState === 4 && rawFile.status == "200") {
//      callback(rawFile.responseText);
//    }
//  }
//  rawFile.send(null);
//
//}
//
//const rawdata = []
//function parseData(text) {
//  var lines = text.split('\n');
//  for (let i = 0; i < lines.length; i++) {
//    if (lines[i] !== '') {
//      const d = JSON.parse(lines[i]);
//      d["created_at"] = d["created_at"].substring(0, 19)
//      d['created_int'] = Date.parse(d["created_at"])
//      if (d['language']==='en' && d.retweets_count > 1){
//        rawdata.push(d)
//      }
//    }
//  }
//}
//const rawdata1=[]
//const rawdata2=[]
//const rawdata3=[]
//const rawdata4=[]
//const rawdata5=[]
//const rawdata6=[]
//const select_map = {
//  1:rawdata1,
//  2:rawdata2,
//  3:rawdata3,
//  4:rawdata4,
//  5:rawdata5,
//  6:rawdata6
//}
//readTextFile("./21.json", function (text6) {
//  parseData(text6)
//  readTextFile("./22.json", function (text7) {
//    parseData(text7)
//    readTextFile("./23.json", function (text8) {
//      parseData(text8)
//
//      for (let i = 0; i < rawdata.length; i++) {
//        var d = rawdata[i];
//        if ((d["created_int"] > 1603324795000) && (d["created_int"] < 1603281600000)) {
//          rawdata1.push(d)
//        }
//        if ((d["created_int"] > 1603281600000) && (d["created_int"] < 1603324800000)) {
//          rawdata2.push(d)
//        }
//        if ((d["created_int"] > 1603324800000) && (d["created_int"] < 1603368000000)){
//          rawdata3.push(d)
//        }
//        if (d["created_int"] > 1603368000000 && (d["created_int"] < 1603411200000)){
//          rawdata4.push(d)
//        }
//        if ((d["created_int"] > 1603411200000) && (d["created_int"] < 1603454400000)){
//          rawdata5.push(d)
//        }
//        if (d["created_int"] > 1603454400000){
//          rawdata6.push(d)
//        }
//
//      }
//    })})})
const tick = ['09:00 Welker', '09:01 Trump', '09:03 Welker Biden', '09:05 Welker Trump', '09:06 Welker Biden Trump', '09:08 Welker Biden', '09:09 Welker Trump', '09:10 Welker Biden Trump', '09:11 Welker Biden Trump', '09:12 Biden Welker Trump', '09:13 Welker Biden', '09:14 Welker Trump', '09:15 Trump Welker Biden', '09:16 Trump', '09:17 Welker Biden', '09:18 Trump Welker', '09:19 Welker Biden', '09:20 Welker Trump', '09:21 Welker Biden', '09:23 Welker Trump', '09:26 Welker Biden', '09:27 Welker Trump', '09:28 Welker Trump', '09:29 Welker Biden Trump', '09:30 Welker Biden', '09:32 Trump Welker Biden', '09:33 Welker Biden', '09:35 Welker Trump Biden', '09:36 Trump Welker Biden', '09:37 Trump Welker', '09:38 Trump', '09:39 Welker Biden', '09:40 Welker Biden Trump', '09:41 Trump Welker', '09:45 Welker Biden', '09:47 Welker Biden', '09:48 Welker Trump', '09:49 Welker Trump Biden', '09:50 Trump Welker Biden', '09:51 Welker Trump Biden', '09:52 Trump Welker Biden', '09:53 Welker Biden', '09:54 Trump', '09:55 Biden Welker', '09:56 Welker Trump', '09:57 Welker Trump Biden', '09:58 Trump Welker', '09:59 Trump Welker Biden', '10:01 Welker Trump Biden', '10:02 Welker Trump Biden', '10:03 Welker', '10:04 Biden Trump Welker', '10:06 Welker Trump', '10:08 Welker Biden', '10:10 Trump Biden Welker', '10:11 Welker Trump Biden', '10:12 Trump Welker', '10:13 Welker Biden', '10:14 Welker Trump Biden', '10:15 Biden', '10:16 Trump Biden', '10:17 Welker Biden Trump', '10:18 Trump', '10:19 Welker Biden', '10:21 Trump', '10:22 Welker', '10:23 Biden', '10:24 Welker Trump Biden', '10:25 Welker Biden Trump', '10:26 Biden Welker Trump', '10:27 Welker Biden', '10:28 Welker Trump Biden', '10:29 Trump Welker Biden', '10:30 Welker', '10:31 Biden', '10:32 Welker']
const field = {'Tweets':['created_at','replies_count','retweets_count','likes_count','tweet'],'Transcript':['candidate','sentence']}
sele = d3.select('#text-select')
    .selectAll("option_")
    .data(tick)
    .enter()
    .append('option')
    .attr('value',d => d)
    .text(d => d)


rawdata_tw = null
rawdata = rawdata_trans

d3.json("./tweets.json", function(error, root) {
    rawdata_tw = root
})




let select_day = '09:00 PAGE'
let select_categ = 'Transcript'
function getOption() {
  selectElement = document.querySelector('#text-select');
  select_day = selectElement.options[selectElement.selectedIndex].value;
  // document.querySelector('.output').textContent = output;
  button_field.dispatchEvent(new Event('click'))
}

function getOption1() {
  selectElement = document.querySelector('#categ-select');
  select_categ = selectElement.options[selectElement.selectedIndex].value;
  // document.querySelector('.output').textContent = output;
  button_field.dispatchEvent(new Event('click'))
  if(select_categ == 'Tweets'){
      rawdata = rawdata_tw
  }
  else{
      rawdata = rawdata_trans
  }
}


var button_field = null
var SimpleSearch = function (serviceUrl, callbacks, containers, configuration) {
  'use strict'

  var selectors = containers || {}
  var callbackFunc = callbacks || {}
  var config = configuration || {}

  var paging = {
    query: '*:*',
    limit: 10,
    bookmarks: [],
    hasMore: false
  }

  var inputField = null
  if (selectors && selectors.inputField) {
    inputField = (typeof selectors.inputField === 'string') ? document.querySelector(selectors.inputField) : selectors.inputField
  } else {
    inputField = document.querySelector('[data-simple-search],[data-search-table],[data-search-list],[data-search-facets]')
  }

  if (config.deepLinking === true && getUrlQueryString('q')) {
    inputField.value = getUrlQueryString('q')
  } else {
    inputField.value = (selectors.query || inputField.value || '')
  }

  // check data-search-* attributes
  if (!selectors.resultsTable) {
    var tb = inputField.getAttribute('data-search-table')
    if (tb) {
      selectors.resultsTable = tb
    }
  }

  if (!selectors.resultsList) {
    var lt = inputField.getAttribute('data-search-list')
    if (lt) {
      selectors.resultsList = lt
    }
  }

  if (!selectors.facetsList) {
    var rt = inputField.getAttribute('data-search-facets')
    if (rt) {
      selectors.facetsList = rt
    }
  }

  var url = serviceUrl

  if (!url) {
    url = inputField.getAttribute('data-simple-search') || window.location.origin
  }

  if (url.lastIndexOf('/') !== url.length - 1) {
    url += '/'
  }

  var key = inputField.id || url
  if (key && SimpleSearch.inputs[key]) {
    SimpleSearch.update(key, callbackFunc, selectors)
    return
  }

  var searchButton = false
  if (selectors.searchButton === true || selectors.searchButton === 'true') {
    searchButton = 'simplesearch-button'
  } else if (typeof selectors.searchButton === 'string') {
    searchButton = selectors.searchButton
  }

  var spinner = null
  var reset = null

  function initSpinner () {
    spinner = document.createElement('div')
    spinner.className = 'simplesearch-spinner'
    spinner.innerHTML = '&profline;'
    spinner.style.display = 'inline-block'
    spinner.style.margin = '5px'
    spinner.style.animationName = 'simpleSearchSpinner'
    spinner.style.animationDuration = '0.5s'
    spinner.style.animationTimingFunction = 'linear'
    spinner.style.animationIterationCount = 'infinite'

    // add keyframe styles for spinner to <HEAD>
    if (document.getElementById) {
      var style = '@-webkit-keyframes simpleSearchSpinner' +
        '{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}' +
        '@-moz-keyframes simpleSearchSpinner' +
        '{from{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(360deg)}}' +
        '@-ms-keyframes simpleSearchSpinner' +
        '{from{-ms-transform:rotate(0deg)}to{-ms-transform:rotate(360deg)}}'

      var st = document.createElement('style')
      st.setAttribute('id', 'simplesearch-style')
      st.innerHTML = style
      document.getElementsByTagName('head')[0].appendChild(st)
    }
  }

  function initInputField () {
    if (inputField) {
      // set up input field reset button
      reset = document.createElement('div')
      reset.className = 'simplesearch-reset'
      reset.innerHTML = '&times'
      reset.style.color = '#323232'
      reset.style.cursor = 'pointer'
      reset.style.display = 'inline-block'
      reset.style.left = '-1em'
      reset.style.margin = 'auto'
      reset.style.position = 'relative'
      reset.style.visibility = 'hidden'
      reset.setAttribute('tabindex', 0)
      reset.setAttribute('role', 'button')

      // perform search on Enter key press
      inputField.addEventListener('keydown', function (event) {
        var key = event.which || event.keyCode
        if (key === 13 && inputField.value && inputField.value.length > 0) {
          event.preventDefault()
          search(inputField.value)
        }
      })

      // add input field reset button
      if (inputField.parentNode.querySelector('.simplesearch-reset') == null) {
        inputField.parentNode.insertBefore(reset, inputField.nextSibling)
      }

      reset.addEventListener('click', function (event) {
        event.preventDefault()
        reset.style.visibility = 'hidden'
        inputField.focus()
        search('*:*')
      })

      // perform search on Enter key press
      reset.addEventListener('keydown', function (event) {
        var key = event.which || event.keyCode
        if (key === 13 && inputField.value && inputField.value.length > 0) {
          event.preventDefault()
          reset.style.visibility = 'hidden'
          inputField.focus()
          search('*:*')
        }
      })

      // show/hide input field reset button
      inputField.addEventListener('input', function (event) {
        var c = event.target.value !== '*:*'
        reset.style.visibility = (c ? 'initial' : 'hidden')
      })

      //  attach to search button click
      if (searchButton) {
        button_field = document.querySelector(searchButton)
        // add input field reset button
        if (button_field == null) {
          button_field = document.createElement('button')
          button_field.className = searchButton
          button_field.innerHTML = ' Search '
          reset.parentNode.insertBefore(button_field, reset.nextSibling)
        }

        button_field.addEventListener('click', function () {
          search(inputField.value)
        })
      }
    }
  }

  function getUrlQueryString (queryparam) {
    var key = escape(queryparam).replace(/[\.\+\*]/g, '\\$&')
    var regex = new RegExp('^(?:.*[&\\?]' + key + '(?:\\=([^&]*))?)?.*$', 'i')
    return unescape(window.location.search.replace(regex, '$1'))
  }

  function getSearchUrl (searchquery, options) {
    var q = null
    var l = null
    var b = null
    var opts = (options || {})

    if (opts.bookmark) {
      q = paging.query
      l = paging.limit
      b = opts.bookmark
    } else {
      q = (searchquery || '*:*')
      l = opts.limit

      // reset private variables
      paging.query = q
      paging.limit = l
      paging.bookmarks = []
    }

    var v = config.viewPath || 'search'
    if (v.indexOf('/') === 0) {
      v = v.substring(1)
    }

    var pm = config.params || ''
    if (pm && pm.indexOf('&') !== 0) {
      pm = '&' + pm
    }
    if (pm && pm.lastIndexOf('&') !== -1) {
      pm += '&'
    }

    return url + v + '?q=' + q +
            (config.query ? (' AND ' + config.query) : '') +
            (l ? ('&limit=' + l) : '') +
            (v !== 'search' && pm && pm.indexOf('include_docs=') === -1 ? '&include_docs=true' : '') +
            (pm || '') +
            (b ? ('&bookmark=' + b) : '')
  }

  function search (searchquery, options, fromPaging) {
    var q = fromPaging ? paging.query : searchquery
    if (q) {
      console.log(paging)
      console.log(searchquery, options, fromPaging)

      var searchurl = getSearchUrl(q, options)

      var doneFunc = function (err, data_u) {

        const data =  {
          'rows':[],
          'fields':field[select_categ],
          'counts':[1]
        }

        const currRawdata = rawdata[select_day]
//        console.log(currRawdata)
        let searchqueryArray = searchquery.split(" ")
        if(select_categ == 'Tweets'){
            for (let i = 0; i < currRawdata.length; i++) {
              let found = true
              for (let j = 0; j < searchqueryArray.length; j++) {
                    if (!currRawdata[i].tweet.includes(searchqueryArray[j])){
                      found = false
                      break
                    }
              }

              if (found){
                // data.rows.push([rawdata[i].created_at,rawdata[i].replies_count,rawdata[i].retweets_count, rawdata[i].likes_count,rawdata[i].tweet])
                data.rows.push(currRawdata[i])
                // if (data.rows.length > 800) {
                //   break
                // }
              }
            }
        }
        else{
            for (let i = 0; i < currRawdata.length; i++) {
              let found = true
              for (let j = 0; j < searchqueryArray.length; j++) {
                    if (!currRawdata[i].sentence.includes(searchqueryArray[j])){
                      found = false
                      break
                    }
              }

              if (found){
                // data.rows.push([rawdata[i].created_at,rawdata[i].replies_count,rawdata[i].retweets_count, rawdata[i].likes_count,rawdata[i].tweet])
                data.rows.push(currRawdata[i])
                // if (data.rows.length > 800) {
                //   break
                // }
              }
            }

        }

        var response = xhrSuccess(data)

        response.rest_uri = searchurl
        response.time = ((new Date()).getTime() - starttime)

        if (data.bookmark) {
          paging.bookmarks.push(data.bookmark)
        }

        if (!paging.limit) {
          paging.limit = data.rows.length
        }

        paging.hasMore = data.total_rows > (paging.bookmarks.length * (paging.limit ? paging.limit : 1))

        response.paging = paging

        handleSuccess(response, fromPaging)

      }

      if (callbackFunc.onBefore) {
        var u = callbackFunc.onBefore(q, options, paging, searchurl)
        if (u) {
          searchurl = u
        }
      }

      if (!fromPaging) {
        updateSearchUI(q)
      }

      var starttime = (new Date()).getTime()
      xhrSearch(searchurl, doneFunc)
    } else {
      handleFail({error: 'bad_request', reason: 'Missing search query'})
    }
  }

  function updateSearchUI (query) {
    if (query) {
      inputField.value = query
    }

    for (var selector in selectors) {
      if (selector === 'resultsTable' || selector === 'resultsList' || selector === 'facetsList') {
        var container = document.querySelector(selectors[selector])
        if (container) {
          while (container && container.firstChild) {
            container.removeChild(container.firstChild)
          }
          container.appendChild(spinner.cloneNode(true))
        }
      }
    }
  }

  function xhrSearch (searchurl, callback) {
    var xmlhttp = new XMLHttpRequest()

    xmlhttp.open('GET', searchurl, true)

    xmlhttp.onreadystatechange = function (e) {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          var response = JSON.parse(xmlhttp.responseText)
          callback(null, response)
        } else {
          callback({error: xmlhttp.status, reason: xmlhttp.statusText})
        }
      }
    }

    updateLocation()
    xmlhttp.send()
    // callback(null, null)
  }

  function updateLocation () {
    if (config.deepLinking === true) {
      if (getUrlQueryString('q') !== inputField.value && history.pushState) {
        var updatedurl = null

        if (getUrlQueryString('q')) {
          updatedurl = window.location.href.replace(/(\?|&)(q=)([^&]*)/g, '$1q=' + inputField.value)
        } else if (window.location.href.indexOf('?') === -1) {
          updatedurl = window.location.href + '?q=' + inputField.value
        } else {
          updatedurl = window.location.href + '&q=' + inputField.value
        }

        window.history.pushState({ path: updatedurl }, '', updatedurl)
      }
    }
  }

  function xhrSuccess (data) {
    var first = data.fields
    var results = {
      data: data,
      fields: [],
      facets: []
    }

    if (first) {
      for (var field in first) {
        if (field !== '_id' && field !== '_rev' && field !== '_order') {
          results.fields.push({
            name: first[field],
            type: (typeof first[field] === 'number' ? 'number' : 'string')
          })
        }
      }

      for (var fld in data.counts) {
        results.facets.push({
          name: 'Result',
          type: (typeof first[fld] === 'number' ? 'number' : 'string')
        })
      }
    }

    return results
  }

  function performPaging (action) {
    if (selectors && selectors.resultsTable) {
      var container = document.querySelector(selectors.resultsTable)
      while (container && container.firstChild) {
        container.removeChild(container.firstChild)
      }
      container.appendChild(spinner.cloneNode(true))
    }

    if (action.toLowerCase() === 'prev') {
      _prev()
    } else if (action.toLowerCase() === 'next') {
      _next()
    }
  }

  function handleFail (response) {
    var c = inputField.value !== '*:*'
    reset.style.visibility = (c ? 'initial' : 'hidden')

    for (var selector in selectors) {
      if (selector === 'resultsTable' || selector === 'resultsList' || selector === 'facetsList') {
        var container = document.querySelector(selectors[selector])
        if (container) {
          while (container.firstChild) {
            container.removeChild(container.firstChild)
          }
          if (selector !== 'facetsList') {
            container.innerHTML = ('Search Error: ' + response.responseText)
          }
        }
      }
    }

    if (callbackFunc.onFail) {
      callbackFunc.onFail(response)
    }
  }

  function handleSuccess (results, fromPaging) {
    if (results.rest_uri && results.rest_uri.indexOf('include_docs=true') !== -1 && results.data.rows) {
      var rows = results.data.rows
      for (var row in rows) {
        var d = rows[row].doc
        d['id'] = rows[row].id
        rows[row] = d
      }
      results.data.rows = rows
    }

    if (callbackFunc.onData) {
      var r = callbackFunc.onData(results)
      if (r) {
        results = r
      }
    }

    var c = inputField.value !== '*:*'
    reset.style.visibility = (c ? 'initial' : 'hidden')

    if (selectors.resultsTable) {
      var resultsTable = formatAsTable(results.fields, results.data.rows, results.data.total_rows, results.paging)

      var container = document.querySelector(selectors.resultsTable)
      while (container && container.firstChild) {
        container.removeChild(container.firstChild)
      }

      container.appendChild(resultsTable)

      var prev = container.querySelector('.simplesearch-prev:not(.disabled)')
      if (prev) {
        prev.addEventListener('click', function () {
          performPaging('prev')
        })
      }

      var next = container.querySelector('.simplesearch-next:not(.disabled)')
      if (next) {
        next.addEventListener('click', function () {
          performPaging('next')
        })
      }
    }

    if (selectors.resultsList) {
      var cntr = document.querySelector(selectors.resultsList)
      if (cntr) {
        if (fromPaging) {
          // reached end of list, hide More button
          var last = (results.paging.bookmarks.length * results.paging.limit)
          if (last >= results.data.total_rows) {
            cntr.querySelector('.simplesearch-more').style.display = 'none'
          }

          // get formatted list items
          var list = cntr.querySelector('.simplesearch-list')
          var liwrapper = document.createElement('div')
          var rows = results.data.rows

          for (var row in rows) {
            liwrapper.innerHTML = getListHTML(rows[row], results.fields)
            // append to existing list
            list.appendChild(liwrapper.firstChild)
          }

          // update count
          cntr.querySelector('.simplesearch-count').innerHTML = getCountHTML(results.data.total_rows, results.paging)
        } else {
          var resultsList = formatAsList(results.fields, results.data.rows, results.data.total_rows, results.paging)

          while (cntr.firstChild) {
            cntr.removeChild(cntr.firstChild)
          }
          cntr.appendChild(resultsList)

          var more = cntr.querySelector('.simplesearch-more')
          if (more) {
            more.addEventListener('click', function () {
              performPaging('next')
            })
          }
        }
      }
    }

    if (selectors.facetsList && !fromPaging) {
      var facetsList = getFacetsList(results.data.counts)

      var tagcloud = facetsList.querySelectorAll('.simplesearch-facet-value-name')
      for (var i = 0; i < tagcloud.length; i++) {
        tagcloud[i].addEventListener('click', function (event) {
          var query = sanitizeQuery(inputField.value, event.target.getAttribute('data-search-query'))
          search(query)
        })
      }

      var container = document.querySelector(selectors.facetsList)
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild)
        }
        container.appendChild(facetsList)
      }
    }

    if (callbackFunc.onSuccess) {
      callbackFunc.onSuccess(results)
    }
  }

  function formatAsTable (fields, rows, total, paging) {
    var resultfields = ''
    var resultrows = ''

    for (var field in fields) {
      resultfields += '<th>' + fields[field].name + '</th>'
    }

    for (var row in rows) {
      resultrows += getRowHTML(rows[row], fields)
    }

    var tableHTML = getTablePagingHTML(paging.bookmarks.length - 1, paging.limit, total) +
      '<table class="simplesearch-table">' +
      '<thead>' + resultfields +
      '</thead><tbody>' + resultrows +
      '</tbody></table>'

    var table = document.createElement('div')
    table.className = 'simplesearch-results-table'
    table.innerHTML = tableHTML

    return table
  }

  function getTablePagingHTML (page, limit, total) {
    var start = (page * limit) + 1
    var end = start + limit - 1

    if (start < 1) {
      start = 1
    }

    if (total < 1) {
      start = 0
    }

    if (end > total) {
      end = total
    }

    if (start > end) {
      end = start
    }

    var pagingDom = '<div class="simplesearch-count"></div>' +
      '<div class="simplesearch-paging"></div>'
    return pagingDom
  }

  function getRowHTML (row, fields) {
    var rowDom = '<tr class="simplesearch-result">'

    for (var field in fields) {
      var n = row[fields[field].name]
      if (Array.isArray(n) && n.length > 0) {
        rowDom += '<td><ul>'

        for (var l in n) {
          if (n[l]) {
            rowDom += '<li>' + n[l] + '</li>'
          }
        }

        rowDom += '</ul></td>'
      } else {
        rowDom += '<td><span>' + (n || '') + '</span></td>'
      }
    }

    rowDom += '</tr>'

    return rowDom
  }

  function formatAsList (fields, rows, total, paging) {
    var resultlist = ''
    var start = ((paging.bookmarks.length - 1) * paging.limit) + 1
    var end = start + paging.limit - 1

    if (start < 1) {
      start = 1
    }

    if (total < 1) {
      start = 0
    }

    if (end > total) {
      end = total
    }

    if (start > end) {
      end = start
    }

    for (var row in rows) {
      resultlist += getListHTML(rows[row], fields)
    }

    var listHTML = '<div class="simplesearch-count">' + getCountHTML(total, paging) + '</div>' +
      '<ul class="simplesearch-list">' + resultlist + '</ul>' +
      (end >= total ? '' : '<div class="simplesearch-paging"><button class="simplesearch-more">More</button>')

    var list = document.createElement('div')
    list.className = 'simplesearch-results-list'
    list.innerHTML = listHTML

    return list
  }

  function getListHTML (row, fields) {
    var listDom = '<li class="simplesearch-result">'
    listDom += '<dl>'

    for (var field in fields) {
      var n = row[fields[field].name]
      listDom += '<dt class="simplesearch-field-' + fields[field].name.replace(/\s/g, '-') + '">' + fields[field].name + '</dt>'

      if (Array.isArray(n) && n.length > 0) {
        if (n.length > 1 || (n[0] && n[0].length > 0)) {
          for (var l in n) {
            listDom += '<dd class="simplesearch-value-' + fields[field].name.replace(/\s/g, '-') + '">' + n[l] + '</dd>'
          }
        }
      } else if (n && n.length > 0) {
        listDom += '<dd class="simplesearch-value-' + fields[field].name.replace(/\s/g, '-') + '">' + n + '</dd>'
      }
    }

    listDom += '</dl>'
    listDom += '</li>'

    return listDom
  }

  function getCountHTML (total, paging) {
    var start = ((paging.bookmarks.length - 1) * paging.limit) + 1
    var end = start + paging.limit - 1

    if (start < 1) {
      start = 1
    }

    if (total < 1) {
      start = 0
    }

    if (end > total) {
      end = total
    }

    if (start > end) {
      end = start
    }

    return '<span>Showing ' + end + ' of ' + total + '</span>'
  }

  function getFacetsList (counts) {
    var facets = ''

    for (var countkey in counts) {
      var countvalue = counts[countkey]

      facets += '<div class="simplesearch-facet"><h4 class="simplesearch-facet-key">' + countkey + '</h4>'
      facets += '<ul class="simplesearch-facet-value-list">'

      for (var facetkey in countvalue) {
        facets += '<li class="simplesearch-facet-value">' +
          getFacetsHTML(facetkey, countvalue[facetkey], countkey) + '</li>'
      }

      facets += '</ul></div>'
    }

    var list = document.createElement('div')
    list.className = 'simplesearch-facets-list'
    list.innerHTML = facets

    return list
  }

  function getFacetsHTML (facetkey, facetvalue, countkey) {
    var k = countkey.indexOf(' ') === -1 ? countkey : ('"' + countkey + '"')
    var v = facetkey.indexOf(' ') === -1 && isNaN(facetkey) ? facetkey : ('"' + facetkey + '"')

    return '<span class="simplesearch-facet-value-name" role="button" data-search-query=\'' +
      k + ':' + v + '\'>' +
      facetkey +
      '</span> <span class="simplesearch-facet-value-count">(' +
      facetvalue +
      ')</span>'
  }

  function sanitizeQuery (current, next) {
    var keyvalue = next.split(':')

    // add quotes if facet contains space and is not already quoted
    var query = (keyvalue[0].indexOf(' ') === -1 || keyvalue[0].indexOf('"') === 0)
          ? keyvalue[0]
          : ('"' + keyvalue[0] + '"')

    // add quotes if value contains space and is not already quoted
    if (keyvalue[1]) {
      query += ':'
      query += (keyvalue[1].indexOf(' ') === -1 || keyvalue[1].indexOf('"') === 0)
          ? keyvalue[1]
          : ('"' + keyvalue[1] + '"')
    }

    // remove search query if already exists
    // else append search query
    if (current.indexOf(query) > -1) {
      query = current.replace(query, '').replace(/((\sAND\s)+)/ig, ' AND ')
    } else if (current !== '*:*') {
      var regex = new RegExp(keyvalue[0] + ':\".*?\"', 'i')
      var facet = current.match(regex)

      if (facet) {
        query = current.replace(facet, query)
      } else {
        query += (' AND ' + current)
      }
    }

    query = query.trim()

    if (query.indexOf('AND') === 0) {
      query = query.substring(3)
    }

    if (query.lastIndexOf('AND') === query.length - 3) {
      query = query.substring(0, query.lastIndexOf('AND'))
    }

    if (query.length === 0) {
      query = '*:*'
    }

    return query.trim()
  }

  initSpinner()
  initInputField()

  function _search (query, limit) {
    search(query, {limit: limit})
  }

  function _next () {
    if (paging.bookmarks.length > 0 && paging.hasMore) {
      search(null, {bookmark: paging.bookmarks[paging.bookmarks.length - 1]}, true)
    } else if (callbackFunc.onFail) {
      callbackFunc.onFail({error: 'bad_request', reason: 'Page out of bounds: No next page'})
    }
  }

  function _prev () {
    if (paging.bookmarks.length > 1) {
      paging.bookmarks.splice(-2, 2)
      if (paging.bookmarks.length > 0) {
        search(paging.query, {bookmark: paging.bookmarks[paging.bookmarks.length - 1]}, true)
      } else {
        search(paging.query, {limit: paging.limit})
      }
    } else if (callbackFunc.onFail) {
      callbackFunc.onFail({error: 'bad_request', reason: 'Page out of bounds: No prev page'})
    }
  }

  if (inputField && inputField.value) {
    search(inputField.value)
  }

  return {
    search: _search,
    next: _next,
    prev: _prev,
    callbacks: function (cbs) {
      var c = cbs || {}
      for (var cb in c) {
        callbackFunc[cb] = c[cb]
      }
    },
    selectors: function (slts) {
      var s = slts || {}
      for (var slt in s) {
        selectors[slt] = s[slt]
      }
    },
    configuration: function (configs) {
      var c = configs || {}
      for (var cfg in c) {
        config[cfg] = c[cfg]
      }
    }
  }
}

SimpleSearch.update = function (nodeid, callbacks, selectors, configs) {
  var inputs = []
  if (nodeid) {
    var ssearch = SimpleSearch.inputs[nodeid]
    if (ssearch) {
      ssearch.callbacks(callbacks)
      ssearch.selectors(selectors)
      ssearch.configuration(configs)
    } else {
      var elt = document.getElementById(nodeid)
      elt ? inputs.push(elt) : inputs = document.querySelectorAll('[data-simple-search]')
    }
  } else {
    inputs = document.querySelectorAll('[data-simple-search]')
  }

  function findCallback (cb) {
    if (typeof cb === 'string') {
      var c = cb.split('.')
      var w = window
      for (var i = 0; i < c.length; i++) {
        if (w[c[i]]) {
          w = w[c[i]]
        }
      }
      if (w !== window) {
        cb = w
      }
    }
    return cb
  }

  for (var i = 0; i < inputs.length; i++) {
    var node = inputs[i]
    var serviceUrl = node.getAttribute('data-simple-search')
    var containers = {
      resultsTable: (selectors && selectors.resultsTable)
        ? selectors.resultsTable
        : node.getAttribute('data-search-table'),
      resultsList: (selectors && selectors.resultsList)
        ? selectors.resultsList
        : node.getAttribute('data-search-list'),
      facetsList: (selectors && selectors.facetsList)
        ? selectors.facetsList
        : node.getAttribute('data-search-facets'),
      inputField: node
    }
    var callbackFuncs = {
      onBefore: (callbacks && callbacks.onBefore)
        ? callbacks.onBefore
        : findCallback(node.getAttribute('data-search-onbefore')),
      onData: (callbacks && callbacks.onData)
        ? callbacks.onData
        : findCallback(node.getAttribute('data-search-ondata')),
      onSuccess: (callbacks && callbacks.onSuccess)
        ? callbacks.onSuccess
        : findCallback(node.getAttribute('data-search-onsuccess')),
      onFail: (callbacks && callbacks.onFail)
        ? callbacks.onFail
        : findCallback(node.getAttribute('data-search-onfail'))
    }

    var dl = (configs && configs.hasOwnProperty('deepLinking'))
        ? configs.deepLinking
        : node.getAttribute('data-search-deeplinking')

    var vp = (configs && configs.hasOwnProperty('viewPath'))
        ? configs.viewPath
        : node.getAttribute('data-search-viewpath')

    var qp = (configs && configs.hasOwnProperty('query'))
        ? configs.query
        : node.getAttribute('data-search-query')

    var pm = (configs && configs.hasOwnProperty('params'))
        ? configs.params
        : node.getAttribute('data-search-params')

    var configuration = {
      deepLinking: typeof dl === 'string' ? dl.toLowerCase() === 'true' : dl === true,
      viewPath: vp || 'search',
      query: qp || '',
      params: pm || ''
    }

    var key = node.id || serviceUrl
    if (key && !SimpleSearch.inputs[key]) {
      SimpleSearch.inputs[key] = new SimpleSearch(serviceUrl, callbackFuncs, containers, configuration)
    } else {
      SimpleSearch.update(key, callbackFuncs, containers, configuration)
    }
  }
}

SimpleSearch.inputs = {};

// find elements with data-simple-search attributes and initiate them
(function () {
  window.addEventListener('DOMContentLoaded', function () {
    SimpleSearch.update()
  })
}())
