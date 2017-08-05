(function ($) {
    'use strict';

    var _sb = _sb || {};
    // ||(or 연산자) 겹쳐지는게 있을수도 있느니 넣어둘것.

    // Document Ready
    $(function () {
        _init();
        _initEvent();
        firstAnimations();
    });

    //정의를 내리는 부분
    function _init() {
        _sb.$topCard = $('.top-card');
        _sb.$header = $('header');
        _sb.headerHeight = _sb.$header.height();
        _sb.$search = $('.search')
        _sb.$searchInput = _sb.$search.find('input')
        _sb.$searchImg = _sb.$search.find('img')
        _sb.searchValue = '';
        _sb.ENTER_KEY = 13;
    }

    //기능을 실행하는 부분
    function _initEvent() {
        toggleTopCard();
        megaMenuHandler();
        searchHandler();
    }

    function toggleTopCard() {
        $('.toggle-top-card').on({
            click: function () {
                _sb.$topCard.slideToggle(400);
            },
            mouseenter: function () {
                animateToggleTopCardBtn();
            }
        });
    }

    function animateToggleTopCardBtn() {
        //TweenMax.to(대상,시간,내용);
        //SET
        TweenMax.killChildTweensOf('.toggle-top-card');
        var cup = '.toggle-top-card .cup';
        var star = '.toggle-top-card .star';

        TweenMax.set(cup, { y: 44 });
        TweenMax.set(star, { y: -44, opacity: .6 });

        //PLAY
        TweenMax.to(cup, 1.5, { y: 5, ease: Back.easeOut.config(2) });

        var ani = new TimelineMax();
        ani.to(star, .8, { x: -12, y: -4, ease: Back.easeOut.config(2) })
            .to(star, .8, { x: -2, y: 0, ease: Back.easeOut.config(2) })
            .to(star, .4, { opacity: 1, repeat: 7, yoyo: true }, '-=1.6');
    }


    function megaMenuHandler() {
        $('.main-menu > ul > li').on({
            mouseenter: function () {
                openMegaMenu($(this));
            },
            mouseleave: function () {
                closeMegaMenu($(this));
            }
        });
    }

    function openMegaMenu($this) {
        $this.addClass('on');

        var megaHeight = $this.find('.mega-menu').height();

        _sb.$header
            .css({ borderBottomColor: '#2c2a29' })
            .stop()
            .animate({
                height: _sb.headerHeight + megaHeight
            }, 250);
    }

    function closeMegaMenu($this) {
        $this.removeClass('on');

        _sb.$header
            .css({borderBottomColor: '#c8c8c8'})
            .stop()
            .animate({
                height: _sb.headerHeight
            }, 250);
    }

    function searchHandler() {
        _sb.$searchInput.on({
            focus: function () {
                focusSearch();
            },
            blur: function () {
                blurSearch();
            },
            keydown: function (event) {
                submitSearch($(this), event);
            }
        });

        _sb.$searchImg.on({
            click: function () {
                _sb.$searchInput.focus();
            }
        })
    }

    function focusSearch() {
        _sb.$search
            .stop()
            .animate({width: 182}, 600);
        _sb.$searchInput
            .stop()
            .animate({width: 182}, 600)
            .attr({placeholder: '통합검색'});
        _sb.$searchImg.stop(false, true).fadeOut(600);

        if(_sb.searchValue !== '') {
            _sb.$searchInput.val(_sb.searchValue);
        }

    }

    function blurSearch() {
        _sb.$search
            .stop()
            .animate({ width: 38 }, 600);
        _sb.searchValue = _sb.$searchInput.val();
        _sb.$searchInput
            .stop()
            .animate({ width: 38 }, 600)
            .attr({placeholder: '' })
            .val('');
        _sb.$searchImg.stop(false, true).fadeIn(600);
    }

    function submitSearch($this, event) {
        switch (event.which) {
            case _sb.ENTER_KEY:
            event.preventDefault();
            console.log( $this.val() );
            break;
            // if보다 switch를 사용하는게 편리하다.
            // if (event.which ===13) {
            //     event.preventDefault();
            //     console.log( $this.val() );
            // }
        }
    }

    function firstAnimations() {
        $('.visual .fade-in').each(function (index) {
            TweenMax.to(this, 1, { opacity: 1, delay: (index+ 1) * .7})
        // TweenMax.to($(this), 1m {}); 로도 사용가능
        });
    }

}(jQuery));


//(function (root, doc, $ :약자)로도 많이 사용