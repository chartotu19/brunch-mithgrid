(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  var Application;

  Application = {
    initialize: function() {
      var HomeView, Router;

      HomeView = require('views/home-view');
      Router = require('lib/router');
      this.homeView = new HomeView();
      this.router = new Router();
      if (typeof Object.freeze === 'function') {
        return Object.freeze(this);
      }
    }
  };

  module.exports = Application;
  
});
window.require.register("initialize", function(exports, require, module) {
  var app;

  app = require('application');

  $(function() {
    app.initialize();
    return Backbone.history.start();
  });
  
});
window.require.register("lib/router", function(exports, require, module) {
  var application;

  application = require('application');

  module.exports = Backbone.Router.extend({
    routes: {
      '': 'home'
    },
    home: function() {
      return $('body').html(application.homeView.render().el);
    }
  });
  
});
window.require.register("models/collection", function(exports, require, module) {
  module.exports = Backbone.Collection.extend({});
  
});
window.require.register("models/model", function(exports, require, module) {
  module.exports = Backbone.Model.extend({});
  
});
window.require.register("views/home-view", function(exports, require, module) {
  var View, template;

  View = require('./view');

  template = require('./templates/home');

  module.exports = View.extend({
    id: 'home-view',
    template: template
  });
  
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="navbar navbar-inverse navbar-fixed-top"><div class="navbar-inner"><div class="container"><button type="button" data-toggle="collapse" data-target=".nav-collapse" class="btn btn-navbar"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#" class="brand">MITHgrid</a><div class="nav-collapse collapse"><ul class="nav"><li class="active"><a href="#">Home</a></li><li><a href="#about">About</a></li><li><a href="#contact">Contact</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">Demos<b class="caret"></b></a><ul class="dropdown-menu"><li><a href="#">ToDo</a></li><li><a href="#">Backbone+MITHgrid</a></li></ul></li></ul>/.nav-collapse </div></div></div><div class="container"><!--<Main>hero unit for a primary marketing message or call to action </Main>--><div class="hero-unit"><h2>Brunch with MITHgrid and BackboneJs</h2><p>This is a new Brunch skeleton (basically an application boilerplate that provides a good starting point for new applications) which includes Backbone.js, MITHgrid (JavaScript framework for building browser-based applications composed of a small core and a set of plugins) and Twitter Bootstrap.</p></div><!--<Example>row of columns </Example>--><div class="row"><div class="span4 well"><h2>Features</h2><ul><li>Templating with <a href="http://jade-lang.com/">Jade</a></li><li>Bootstrap 2.3 using <a href="sass-lang.com">SASS</a> from Thomas McDonald\'s bootstrap-sass</li><li><a href="coffeescript.org">CoffeeScript</a></li><li><a href="documentcloud.github.com/backbone/">Backbone 1.0.0</a> for data models and routing</li><li><a href="https://github.com/umd-mith/mithgrid">MITHgrid</a> for data-centric view presentation.</li></ul></div><div class="span6"><h2>Coming Soon!</h2><ul><li>Simple demo application such as TODO application using MITHgrid.</li><li>Build fairly complex demos using backbone and MITHgrid.</li></ul><p><a href="https://github.com/selvam1991/brunch-mithgrid" class="btn btn-inverse">View Project on GitHub </a></p></div></div><hr/><footer><p>© Company 2013</p></footer></div><!--/container --></div>');
  }
  return buf.join("");
  };
});
window.require.register("views/templates/index", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div id="content"><h1>brunch<h2>Welcome!</h2><ul><li><a href="http://brunch.readthedocs.org/">Documentation</a></li><li><a href="https://github.com/brunch/brunch/issues">Github Issues</a></li><li><a href="https://github.com/brunch/twitter">Twitter Example App</a></li><li><a href="https://github.com/brunch/todos">Todos Example App</a></li></ul></h1></div>');
  }
  return buf.join("");
  };
});
window.require.register("views/templates/layout", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><title>UI</title><link rel="stylesheet" href="/stylesheets/app.css"></head><body>');
  var __val__ = body
  buf.push(null == __val__ ? "" : __val__);
  buf.push('<script src="/javascripts/vendor.js"></script><script src="/javascripts/app.js"></script></body></html>');
  }
  return buf.join("");
  };
});
window.require.register("views/view", function(exports, require, module) {
  var View, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = View = (function(_super) {
    __extends(View, _super);

    function View() {
      this.afterRender = __bind(this.afterRender, this);
      this.render = __bind(this.render, this);
      this.getRenderData = __bind(this.getRenderData, this);
      this.template = __bind(this.template, this);
      this.initialize = __bind(this.initialize, this);    _ref = View.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    View.prototype.initialize = function() {
      return this.render = _.bind(this.render, this);
    };

    View.prototype.template = function() {};

    View.prototype.getRenderData = function() {};

    View.prototype.render = function() {
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    };

    View.prototype.afterRender = function() {};

    return View;

  })(Backbone.View);
  
});
