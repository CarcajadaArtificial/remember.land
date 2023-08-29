import { Header, Input, Text } from 'lunchbox';
import { Handlers, PageProps } from '$fresh/server.ts';
import { redirect } from 'redirect';
import { WithSession } from 'fresh_session';

type Data = {
  session: Record<string, string>;
  incorrect_password: boolean;
};

export const handler: Handlers<Data, WithSession> = {
  GET(_req, ctx) {
    return ctx.state.session.get('isSignedIn') ? redirect('/') : ctx.render({
      session: ctx.state.session.data,
      incorrect_password: false,
    });
  },

  async POST(req, ctx) {
    const data = await req.formData();
    const enteredPassword = data.get('password');

    if (enteredPassword === Deno.env.get('PASSWORD')) {
      await ctx.state.session.set('isSignedIn', true);

      return redirect('/');
    } else {
      return ctx.render({
        session: ctx.state.session.data,
        incorrect_password: true,
      });
    }
  },
};

export default function Signin(props: PageProps<Data>) {
  return (
    <Header banner layout_type='focus'>
      <div class='pb-24'>
        <Text type='heading'>Sign In</Text>
        <form method='POST' action='/signin'>
          <Input
            nostyle
            class='comp-input isl-EntryInput-field'
            type='password'
            label='Password'
            name='password'
            error={props.data.incorrect_password ? 'Incorrect passoword' : ''}
          />
        </form>
      </div>
    </Header>
  );
}
