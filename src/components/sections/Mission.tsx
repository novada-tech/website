import { Stack } from '@chakra-ui/react';
import { Section } from '../ui/Section';
import { SubsectionHeading } from '../ui/SubsectionHeading';
import { BodyText } from '../ui/BodyText';
import { CONTENT_GAP } from '../../config';

export function Mission(): React.JSX.Element {
  return (
    <Section maxWidth="text">
      <Stack gap={CONTENT_GAP.LARGE} align="start">
        <Stack gap={CONTENT_GAP.MEDIUM} align="start">
          <SubsectionHeading>Precision, rigor, and pioneering work</SubsectionHeading>
          <BodyText>Ada Lovelace is considered to be the first programmer.</BodyText>
          <BodyText>
            To me, she represents mathematical precision, abstract reasoning, and the courage to work on problems
            no one has solved before.
          </BodyText>
          <BodyText>
            That is the mindset I bring to software: understanding the structure beneath the
            surface, and designing with intent rather than guesswork.
          </BodyText>
        </Stack>

        <Stack gap={CONTENT_GAP.MEDIUM} align="start">
          <SubsectionHeading>Work that matters</SubsectionHeading>
          <BodyText>
            I am strongly motivated by work that has a positive impact beyond the codebase.
          </BodyText>
          <BodyText>
            I care about fairness and sustainability in society — from climate science and
            environmental impact modelling to AI safety, youth work, and social initiatives.
          </BodyText>
          <BodyText>
            I am less interested in work whose sole purpose is making the already-powerful more
            powerful.
          </BodyText>
        </Stack>
      </Stack>
    </Section>
  );
}
