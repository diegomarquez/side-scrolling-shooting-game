define(function() {
	var Data = function() {};

	var data = '@editor-background-color:#222222;@editor-primary-color:lighten(@editor-background-color,10%);@editor-primary-color-dark:darken(@editor-primary-color,5%);@editor-primary-color-light:lighten(@editor-primary-color,5%);@editor-accent-color:#f0ad4e;@editor-accent-color-dark:darken(@editor-accent-color,5%);@editor-accent-color-light:lighten(@editor-accent-color,5%);@editor-highlight-color-text:#000000;@editor-highlight-color-background:lighten(@editor-accent-color,25%);@editor-highlight-color-border:darken(@editor-accent-color,5%);@editor-error-color-text:#F05C4E;@editor-error-color-background:lighten(#F05C4E,25%);@editor-error-color-border:darken(#F05C4E,5%);@editor-button-primary:#f0ad4e;@editor-button-primary-border:darken(@editor-button-primary,5%);//PlaceHoldervariables@editor-button-success:#5cb85c;@editor-button-success-border:darken(@editor-button-success,5%);@editor-button-info:#5bc0de;@editor-button-info-border:darken(@editor-button-info,5%);@editor-button-warning:#428bca;@editor-button-warning-border:darken(@editor-button-warning,5%);@editor-button-danger:#d9534f;@editor-button-danger-border:darken(@editor-button-danger,5%);@editor-scroll-bar-size:8px;@editor-scroll-bar-track-color:#777777;@bootstrap-fonts-path:"../assets/fonts/";@jquery-ui-images-path:"../assets/images";';

	Data.prototype.get = function() {
		return data;
	}

	return new Data();
});