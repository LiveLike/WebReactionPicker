
class TNTLiveLikeReaction extends LiveLikeReaction {

  addReactionIcon = html`
        <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="1.10449" width="39" height="39" rx="9.5" stroke="#E7E9EA"/>
          <mask id="mask0_3566_187" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="9" y="9" width="22" height="23">
          <rect x="9" y="9.60449" width="22" height="22" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_3566_187)">
          <path d="M20.006 29.7708C18.738 29.7708 17.5463 29.5301 16.431 29.0489C15.3157 28.5676 14.3456 27.9145 13.5206 27.0895C12.6956 26.2645 12.0425 25.2944 11.5612 24.1791C11.08 23.0638 10.8394 21.8721 10.8394 20.6041C10.8394 19.336 11.08 18.1444 11.5612 17.0291C12.0425 15.9138 12.6956 14.9437 13.5206 14.1187C14.3456 13.2937 15.3157 12.6405 16.431 12.1593C17.5463 11.678 18.738 11.4374 20.006 11.4374C20.663 11.4374 21.297 11.5023 21.9081 11.6322C22.5192 11.7621 23.1074 11.9492 23.6727 12.1937V14.2562C23.138 13.9506 22.5612 13.71 21.9425 13.5343C21.3237 13.3586 20.6782 13.2708 20.006 13.2708C17.9741 13.2708 16.2439 13.985 14.8154 15.4135C13.3869 16.8419 12.6727 18.5721 12.6727 20.6041C12.6727 22.636 13.3869 24.3662 14.8154 25.7947C16.2439 27.2232 17.9741 27.9374 20.006 27.9374C22.038 27.9374 23.7682 27.2232 25.1966 25.7947C26.6251 24.3662 27.3394 22.636 27.3394 20.6041C27.3394 20.1152 27.2897 19.6416 27.1904 19.1833C27.0911 18.7249 26.9574 18.2819 26.7894 17.8541H28.7602C28.8977 18.2971 29.0008 18.744 29.0696 19.1947C29.1383 19.6454 29.1727 20.1152 29.1727 20.6041C29.1727 21.8721 28.9321 23.0638 28.4508 24.1791C27.9696 25.2944 27.3164 26.2645 26.4914 27.0895C25.6664 27.9145 24.6963 28.5676 23.581 29.0489C22.4657 29.5301 21.2741 29.7708 20.006 29.7708ZM27.3394 16.0208V14.1874H25.506V12.3541H27.3394V10.5208H29.1727V12.3541H31.006V14.1874H29.1727V16.0208H27.3394ZM23.2144 19.6874C23.5963 19.6874 23.921 19.5537 24.1883 19.2864C24.4557 19.019 24.5894 18.6944 24.5894 18.3124C24.5894 17.9305 24.4557 17.6058 24.1883 17.3385C23.921 17.0711 23.5963 16.9374 23.2144 16.9374C22.8324 16.9374 22.5078 17.0711 22.2404 17.3385C21.973 17.6058 21.8394 17.9305 21.8394 18.3124C21.8394 18.6944 21.973 19.019 22.2404 19.2864C22.5078 19.5537 22.8324 19.6874 23.2144 19.6874ZM16.7977 19.6874C17.1796 19.6874 17.5043 19.5537 17.7716 19.2864C18.039 19.019 18.1727 18.6944 18.1727 18.3124C18.1727 17.9305 18.039 17.6058 17.7716 17.3385C17.5043 17.0711 17.1796 16.9374 16.7977 16.9374C16.4157 16.9374 16.0911 17.0711 15.8237 17.3385C15.5564 17.6058 15.4227 17.9305 15.4227 18.3124C15.4227 18.6944 15.5564 19.019 15.8237 19.2864C16.0911 19.5537 16.4157 19.6874 16.7977 19.6874ZM20.006 25.6458C21.0449 25.6458 21.9883 25.3517 22.8362 24.7635C23.6841 24.1753 24.2991 23.3999 24.681 22.4374H15.331C15.713 23.3999 16.3279 24.1753 17.1758 24.7635C18.0237 25.3517 18.9671 25.6458 20.006 25.6458Z" fill="#14232D"/>
          </g>
        </svg>`

  connectedCallback() {
    super.connectedCallback();
    if (LiveLike._$$.ready && LiveLike.userProfile && LiveLike.userProfile.id) {
      this.loadReactionDetails();
    } else {
      LiveLike.addSdkEventListener(LiveLike.SdkEvent.INITIALISED, this.loadReactionDetails);
    }
    document.addEventListener('hideReactionPicker', this.hideReactionPicker);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    LiveLike.removeEventListener(LiveLike.SdkEvent.INITIALISED, this.loadReactionDetails);
    document.removeEventListener('hideReactionPicker', this.hideReactionPicker);
  }

  loadReactionDetails = () => {
    LiveLike.reactionSpaceController
      .loadReactionSpaceDetail({ targetGroupId: this.targetGroupId })
      .then((reactionSpace) => {
        LiveLike.reactionPackController
          .loadReactionPackFromReactionSpace(reactionSpace)
          .then((_r) => {
            LiveLike.userReactionController
              .loadUserReactions({
                reactionSpaceId: reactionSpace.id,
                targetIds: [this.targetId],
              })
              .then(() => {
                this.setup(reactionSpace.id);
              });
          });
      });
  };

  abbrevNum(num) {
    const unitSymbols = ['', 'k', 'M'];
    const tier = (Math.log10(num) / 3) | 0;
    if (tier == 0) return num;
    const scaled = num / Math.pow(10, tier * 3);
    // Check if number is whole or above 100k so '.0' doesn't get added.
    const wholeOrThreeDigit = scaled % 1 === 0 || scaled >= 10 ? 0 : 1;
    return scaled.toFixed(wholeOrThreeDigit) + unitSymbols[tier];
  }

  renderAddReactionIcon() {
    return html`
      <style>
    
      .reaction-add-icon {
        cursor: pointer;
      }
      
      .reaction-add-icon:hover {
        transform: scale(1.1);
      }
      
      .reaction-add-icon:hover path{
        fill : #CC20CC;
      }

      span.reaction-add-icon.clicked rect {
        fill : #E7E9EA
      }

      .reaction-add-icon {
        margin-right: 8px
      }
      </style>
      <span
      class=${this.showReactionPicker ? 'reaction-add-icon clicked' : 'reaction-add-icon'}
      class="reaction-add-icon"
      @click=${this.toggleReactionPicker}
      >${this.addReactionIcon}</span>`;
  }

  renderUserReactions() {
    const reactions = Object.values(this.userReactions).filter(({ count }) => count > 0)
    const total = reactions.reduce((acc, reaction) => acc + reaction.count, 0)
    return html`
          <style>
          .reaction-container {
            gap : 0px !important;
          }
          .user-reaction-container {
            padding: 0px !important;
            margin-left: -2px;
          }
          .user-reaction-img {
            width: 20px !important;
            height: 20px !important;
          }
          .user-reaction-count {
            font-size: 12px;
            font-weight: 500;
          }
        </style>
        ${reactions.map(reaction => this.renderUserReaction(reaction))}
        
        ${ (total > 0) ? html`<span class="user-reaction-count">${this.abbrevNum(total)}</span>` : ''}
      `;
  }

  renderUserReaction = (userReaction) => {
    return html`
            <span
              class="user-reaction-container ${userReaction.self_reacted_user_reaction_id
        ? 'self-user-reaction' : ''}">
           <img
              class="user-reaction-img"
              src=${userReaction.imageSrc}
              alt=${'user reaction'}
            />`;
  };

  renderReactionPicker() {
    return html`
      <style>
      tnt-livelike-reaction-pop-over {
          position: absolute;
          left:0px;
        }
        span.embed-user-reaction-container.embed-self-user-reaction{
          background:#E7E9EA
        }
        span.embed-user-reaction-container:hover {
          background:#E7E9EA
        }
        span.embed-user-reaction-container.embed-self-user-reaction:hover {
          background:white
        }
        span.embed-user-reaction-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          padding: 4px 8px 4px 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
        }

        span.reaction-add-icon.clicked {
          margin-right: 8px;
        }
      
        .embed-reaction-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 4px !important;
          padding: 4px;
          border: 1px solid #ccc;
          border-radius: 6px;
          flex-wrap : nowrap !important;
          margin-top : 0px !important;
          background-color: #D0D3D5
        }
        
        img.embed-user-reaction-img {
          width: 26px;
          height: 26px;
        }
        
        span.embed-user-reaction-count {
          font-size: 12px;
          margin-left: 0px !important;
          margin-top: 2px;
        }
      </style>
      <tnt-livelike-reaction-pop-over
        targetgroupid=${this.targetGroupId} targetid=${this.targetId} }
      ></tnt-livelike-reaction-pop-over>
    `;
  }

}

customElements.define("tnt-livelike-reaction", TNTLiveLikeReaction);

class TNTLiveLikeReactionPopOver extends LiveLikeEmbedReaction {
  handleReactionClick(userReaction) {
    super.handleReactionClick(userReaction);
    document.dispatchEvent(new CustomEvent('hideReactionPicker'))
  }

  loadReactionDetails= () => {
    //do nothing as details are loaded already
  }

}

customElements.define("tnt-livelike-reaction-pop-over", TNTLiveLikeReactionPopOver);