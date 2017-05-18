import { xpromoSetAppLink } from '../../app/actions/xpromo';
import { getXPromoLinkforCurrentPage } from '../../lib/xpromoState';
import { getExperimentDataByFlags } from '../../app/selectors/xpromo';
import {
  trackBucketingEvents,
  trackPagesXPromoEvents,
} from 'lib/eventUtils';

export const dispatchInitialXPromoLink = async (ctx, dispatch, getState) => {
  const state = getState();
  const link = getXPromoLinkforCurrentPage(state, 'interstitial');
  const experimentData = getExperimentDataByFlags(state);

  dispatch(xpromoSetAppLink(link));

  console.error('=======================================');
  console.error(state.meta.env, 'EVENT: bucketing_events');
  console.error('=======================================');
  trackBucketingEvents(state, experimentData, dispatch);

  console.error('========================================');
  console.error(state.meta.env, 'EVENT: xpromo_view_event');
  console.error('========================================');
  trackPagesXPromoEvents(state);
};